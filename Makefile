build:	public/index.html
	
test: public/index.html
	cd public; python3 -m http.server
	
force:
	soupault --force
  
clean:
	rm -r public/
	
publish: public/index.html
	git add .
	git commit -m 'latest updates'
	git push
	
public/index.html: site/index.md
	soupault --build
