build:	public/index.html
	
test:
	cd public; python3 -m http.server
  
clean:
	rm -r public/
	
publish:
	build
	git push
	
public/index.html: site/index.md
	soupault
