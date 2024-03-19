## How to get code merged for the project

1. Create a "fork" of the ShareEgypt repository to your own repo.
2. Clone **your** forked repository into your local working project folder. `git clone link-to-your-forked-repo`
3. Head to to the main repository of ShareEgypt, and copy the url
4. In the local main directory of your now cloned fork, create a `remote` called `upstream` for the main ShareEgypt repository. 
   `git remote add upstream link-to-the-main-repository`
5. You can check your remotes by doing `git remote -v`, you should have one `origin` for your forked repository, and one `upstream` for the main repository
6. Check git branches with `git branch`
7. Switch out of the `master` branch by creating a new branch. `git checkout -b descriptive-name-of-branch`
8. You'll be switched to that branch. Do your coding on the new branch, add files for staging with `git add filename`, and then commit with useful commit messages `git commit -m "some descriptive commit message"`.
9. Once all commits are done and you're ready to push, **rebase** to master first. Steps are as follows
   - `git checkout master`
   - `git pull upstream master`
   - `git checkout your-branch-name`
   - `git rebase master -i`
   - **pick** your first commit, and **squash** the rest
   Once it has been rebased, all your commits will be squashed as one
10. Push to **your** repository. `git push origin your-branch-name`
11. Head to your repository and check out the changes. If everything is ready, head to the main ShareEgypt repository and create a informative pull-request on that branch.
12. Wait for reviews and tests before merging.