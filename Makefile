test: force
	cd public; python3 -m http.server
	
publish: force
	git add .
	git commit -m 'latest updates'
	eval "$(ssh-agent -s)"
	ssh-add /home/jjw/.ssh/wm_github
	git push ssh://git@ssh.github.com:443/windsormorris/wm-website
	
force:
	soupault --force
  
clean:
	rm -r public/
	
