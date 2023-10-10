build:	public/index.html
	
test:
	cd public; python3 -m http.server
  
clean:
	rm -r public/
	
publish: public/index.html
	git add .
	git commit -m 'latest updates'
	git push
	
public/index.html: site/index.md
	soupault
