all: clean build

build:
	zip EtoysApp -@ < bundle.txt

clean:
	rm -f EtoysApp.zip
