all:
	soupault --debug
	
test:
	cd public; python3 -m http.server
  
clean:
	rm -r public/
