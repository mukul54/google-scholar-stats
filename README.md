# Google Scholar Venue Analyzer

A Chrome extension that analyzes Google Scholar profiles to identify and group publication venues by conference/journal name.

## Features

- Automatically extracts publication venue information from Google Scholar profiles
- **Intelligently groups similar venues** (e.g., "CVPR 2023" and "IEEE Conference on Computer Vision and Pattern Recognition" are grouped as "CVPR")
- Displays a ranked table of normalized venue names
- Shows publication counts for each venue
- Works on any Google Scholar profile page

## Installation

1. Download or clone this repository
2. Create an `images` folder in the extension directory
3. Create or download icon images (16x16, 48x48, and 128x128 pixels)
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" at the top-right
6. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any Google Scholar profile page
2. Click "Show More" at the bottom of the publications list to show all publications you want to analyze
3. Click on the extension icon in your toolbar
4. Press the "Analyze Publication Venues" button
5. View the top 10 venues in the table
6. Click "Show all venues" to see the complete list

## Venue Normalization

The extension uses intelligent pattern matching to normalize venue names:

- Recognizes major conferences and journals (CVPR, NeurIPS, ICCV, etc.) regardless of how they're written
- Groups all arXiv preprints together
- Groups all patents together
- Handles variations in conference naming (full names, acronyms, proceedings of...)
- Removes year information to focus on the venue itself

This provides a much cleaner and more useful analysis of where a researcher publishes.