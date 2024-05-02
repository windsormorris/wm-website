publish: force
	git add .
	git commit -m 'latest updates'
	git push
	
build:	public/index.html
	
test: force
	cd public; python3 -m http.server
	
force:
	soupault --force
  
clean:
	rm -r public/
	
public/index.html: site/index.md
	soupault --build
