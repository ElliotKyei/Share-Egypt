import { React, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import './CreateBlogPage.css';
import { convertToRaw } from 'draft-js';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

class CreateBlogPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            publisher: "",
            imageUrl: "",
            imageCaption: "",
            titleError: "",
            publisherError: "",
            editorState: EditorState.createEmpty(),
            editorContentRaw: "",
            editorContentHTML: null,
            saved: false,
            posted: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ saved: false })
    }

    validate = () => {

        //validate user inputs

        let isValid = true;

        this.setState({ titleError: "" })
        this.setState({ publisherError: "" })

        if (this.state.title.length === 0) {
            this.setState({ titleError: "Please enter a title for your blog" })
            isValid = false;
        }
        if (this.state.publisher.length === 0) {
            this.setState({ publisherError: "Please enter the publisher of this blog" })
            console.log("Publish is empty")
            isValid = false
        }

        return isValid
    }

    handleSave = async (post) => {
        if (this.validate()) {
            //check if user is signed in
            onAuthStateChanged(auth, async (charityUser) => {
                if (charityUser) {
                    console.log("User is signed in")

                    //convert the editor's content to html
                    let getEditorContentHTML = convertToHTML(this.state.editorState.getCurrentContent());
                    this.setState({ editorContentHTML: getEditorContentHTML })

                    //get the charity from the database, and store the blog
                    const charityDoc = doc(db, "charities", charityUser.uid)

                    const currentDate = Date.now()
                    const blogDate = new Date(currentDate).toDateString()

                    await updateDoc(charityDoc, {
                        [`blogs.${this.state.title}.blogTitle`]: this.state.title,
                        [`blogs.${this.state.title}.blogData`]: this.state.editorContentRaw,
                        [`blogs.${this.state.title}.blogHTML`]: this.state.editorContentHTML,
                        [`blogs.${this.state.title}.blogImageUrl`]: this.state.imageUrl,
                        [`blogs.${this.state.title}.blogImageCaption`]: this.state.imageCaption,
                        [`blogs.${this.state.title}.blogPublisher`]: this.state.publisher,
                        [`blogs.${this.state.title}.blogDate`]: blogDate,
                        [`blogs.${this.state.title}.post`]: post
                    })
                    this.setState({ saved: true })
                    console.log("setting post to ", post)
                    this.setState({ posted: post })
                    console.log("Blog has been added")

                }
                else {
                    console.log("No accounts are signed in")
                }
            })
            console.log("No errors in the form")
        }
        else {
            console.log("There was some errors in the form")
        }
    }

    handleExit = (e) => {
        console.log("Exit button pressed")
        const navigate = useNavigate();
        navigate('/userProfile')
    }

    onEditorStateChange = (edState) => {
        this.setState({
            editorState: edState
        });
        let getEditorContent = convertToRaw(this.state.editorState.getCurrentContent());
        this.setState({ editorContentRaw: getEditorContent })
        this.setState({ saved: false })
        console.log(getEditorContent);
    }

    uploadImage = () => {
        //feature to upload additional images
    }

    render() {
        const editorStyle = {
            border: '1px solid lightgray'
        }

        return (
            <div className='container'>

                <h1 className='text-center'>Create a new charity blog post</h1>
                <div style={{ float: 'right' }}>
                    {this.state.saved ?
                        (<Button style={{ 'margin-right': '1.5em' }} id="saveBtn" variant='secondary' disabled>Saved</Button>)
                        :
                        (<Button style={{ 'margin-right': '1.5em' }} onClick={() => { this.handleSave(false) }} id="saveBtn">Save</Button>)}
                    <Button onClick={this.handleExit} id="exitBtn">Exit</Button>
                </div>
                <Form onSubmit={this.validate} noValidate>
                    <Form.Group className='mb-3' id="blogTitleSection" style={{ 'padding-top': '2em' }}>
                        <Form.Label className="blogTitleL">Blog Title</Form.Label>
                        <Form.Control
                            className="blogTitleC"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />

                        {this.state.titleError && (
                            <p className="errorMsg text-danger">{this.state.titleError}</p>
                        )}
                    </Form.Group>

                    <Form.Group className='mb-3' id="blogPublisherSection">
                        <Form.Label className="blogPublisherL">Publisher</Form.Label>
                        <Form.Control
                            className="blogPublisherC"
                            name="publisher"
                            value={this.state.publisher}
                            onChange={this.handleChange}
                        />

                        {this.state.publisherError && (
                            <p className="errorMsg text-danger">{this.state.publisherError}</p>
                        )}

                    </Form.Group>

                    <Form.Group className='uploadImage-section' as={Row}>

                        <Form.Group as={Col} className='mb-3' id="blogImageUrlSection">
                            <Form.Label className="blogImageUrlL" column sm={5}>Image Url</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    className="blogImageUrlC"
                                    name="imageUrl"
                                    value={this.state.imageUrl}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Col} className='mb-3' id="blogCaptionSection">
                            <Form.Label className="blogCaptionL" column sm={8}>Image Caption</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    className="blogCaptionC"
                                    name="imageCaption"
                                    value={this.state.imageCaption}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>

                    </Form.Group>

                    <Form.Group>
                        <p style={{ 'padding-top': '2em' }}>Body</p>
                        <Editor
                            editorState={this.state.editorState}
                            onEditorStateChange={this.onEditorStateChange}
                            editorStyle={editorStyle}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className="d-grid gap-2">
                            {this.state.posted ?
                                (<Button size="lg" style={{ 'margin-top': '2em' }} variant="secondary" disabled>Posted</Button>) :
                                (<Button size="lg" style={{ 'margin-top': '2em' }} onClick={() => { this.handleSave(true) }}>Post</Button>)}
                        </div>
                    </Form.Group>
                </Form>

            </div>
        )
    }
}

export default CreateBlogPage;