publish: force
	git add .
	git commit -m 'latest updates'
	eval "$(ssh-agent -s)"
	ssh-add /home/jjw/.ssh/wm_github
	git push ssh://git@ssh.github.com:443/windsormorris/wm-website
	
build:	public/index.html
	
test: force
	cd public; python3 -m http.server
	
force:
	soupault --force
  
clean:
	rm -r public/
	
public/index.html: site/index.md
	soupault --build
