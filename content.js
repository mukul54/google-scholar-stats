(function() {
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.action === "analyzeVenues") {
          const venueData = extractVenueData();
          sendResponse({venues: venueData});
        }
        return true; // Required for async response
      }
    );
  
    // Extract venue data from publication list with improved normalization
    function extractVenueData() {
      // Get all publication entries currently visible
      const publications = document.querySelectorAll('tr.gsc_a_tr');
      
      // Initialize venue counters
      let venues = {};
      
      // Process each publication
      publications.forEach(pub => {
        // The venue is typically in the third column
        const venueElement = pub.querySelector('.gs_gray:nth-child(3)');
        
        if (venueElement) {
          // Extract venue name - typically before the first comma
          let venueText = venueElement.textContent.trim();
          let normalizedVenue = normalizeVenue(venueText);
          
          // Count occurrences
          if (normalizedVenue) {
            venues[normalizedVenue] = (venues[normalizedVenue] || 0) + 1;
          }
        }
      });
      
      // Convert to array and sort by count
      const venueArray = Object.entries(venues).map(([venue, count]) => ({venue, count}));
      venueArray.sort((a, b) => b.count - a.count);
      
      return venueArray;
    }
    
    // Function to normalize venue names
    function normalizeVenue(venueText) {
      // Skip empty venues
      if (!venueText) return null;
      
      // Common venue patterns to normalize
      const venuePatterns = [
        // arXiv preprints
        { regex: /arXiv( preprint)?( arXiv:\d+\.\d+)?/i, group: "arXiv" },
        
        // CVPR variations
        { regex: /IEEE.*?(Computer Vision and Pattern Recognition|CVPR)|CVPR|Proceedings.*?(Computer Vision and Pattern Recognition|CVPR)|CVF.*?(Computer Vision and Pattern Recognition|CVPR)/i, group: "CVPR" },
        
        // ICCV variations
        { regex: /IEEE.*?(International Conference on Computer Vision|ICCV)|ICCV|Proceedings.*?(International Conference on Computer Vision|ICCV)|CVF.*?(International Conference on Computer Vision|ICCV)/i, group: "ICCV" },
        
        // ECCV variations
        { regex: /European Conference on Computer Vision|ECCV|Proceedings.*?ECCV/i, group: "ECCV" },
        
        // NeurIPS variations
        { regex: /Neural Information Processing Systems|NeurIPS|Advances in Neural Information/i, group: "NeurIPS" },
        
        // ICML variations
        { regex: /International Conference on Machine Learning|ICML/i, group: "ICML" },
        
        // ICLR variations
        { regex: /International Conference on Learning Representations|ICLR/i, group: "ICLR" },
        
        // AAAI variations
        { regex: /AAAI Conference on Artificial Intelligence|AAAI|Proceedings.*?AAAI/i, group: "AAAI" },
        
        // Patents
        { regex: /US Patent|Patent App/i, group: "US Patents" },
        
        // BMVC variations
        { regex: /British Machine Vision Conference|BMVC/i, group: "BMVC" },
        
        // IJCV variations
        { regex: /International Journal of Computer Vision|IJCV/i, group: "IJCV" },
        
        // ICRA variations
        { regex: /International Conference on Robotics and Automation|ICRA/i, group: "ICRA" },
        
        // TIP variations
        { regex: /Transactions on Image Processing|TIP/i, group: "IEEE TIP" },
        
        // TPAMI variations
        { regex: /Transactions on Pattern Analysis and Machine Intelligence|TPAMI|PAMI/i, group: "IEEE TPAMI" },
        
        // WACV variations
        { regex: /Winter Conference on Applications of Computer Vision|WACV/i, group: "WACV" },
        
        // ICASSP variations
        { regex: /International Conference on Acoustics|ICASSP/i, group: "ICASSP" },
        
        // TMLR
        { regex: /Transactions on Machine Learning Research|TMLR/i, group: "TMLR" },
        
        // ICDM variations
        { regex: /International Conference on Data Mining|ICDM/i, group: "ICDM" },
      ];
      
      // Try to match venue patterns
      for (const pattern of venuePatterns) {
        if (pattern.regex.test(venueText)) {
          return pattern.group;
        }
      }
      
      // Fallback: use first part of venue string (before comma or parenthesis)
      let simplifiedVenue = venueText.split(/[,(]/)[0].trim();
      return simplifiedVenue;
    }
  })();