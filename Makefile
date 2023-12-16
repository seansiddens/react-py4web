# Makefile for managing a project with py4web and React

# Configuration
REACT_APP_FOLDER = frontend
REACT_BUILD_FOLDER = static/build

# Command to build the React app and move it to the py4web static folder
.PHONY: build-react
build-react:
	@echo "Building React app..."
	cd $(REACT_APP_FOLDER) && npm run build
	@echo "Moving build to py4web static folder..."
	rm -rf $(REACT_BUILD_FOLDER)/*
	cp -R $(REACT_APP_FOLDER)/build/* $(REACT_BUILD_FOLDER)/
