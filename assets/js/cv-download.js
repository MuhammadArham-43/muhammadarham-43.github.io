/**
 * CV Download Handler
 * Fetches the latest CV PDF from Overleaf using the compile-overleaf module
 * 
 * To set up:
 * 1. Go to your Overleaf project
 * 2. Click "Share" in the top right
 * 3. Enable "Link Sharing" and copy the read token from the URL
 *    (e.g., if URL is https://overleaf.com/read/abc123xyz, the token is "abc123xyz")
 * 4. Replace 'YOUR_OVERLEAF_READ_TOKEN' below with your actual token
 */

(function() {
  'use strict';
  
  // Immediate console log to verify script is loading
  console.log('CV Download: Script loaded and executing');
  console.log('CV Download: Current URL:', window.location.href);
  
  // Replace this with your Overleaf read token
  // Get it from your Overleaf project's shareable link
  const OVERLEAF_READ_TOKEN = 'wfxcvkkpztkk';

  // Check if token is configured
  if (OVERLEAF_READ_TOKEN === 'YOUR_OVERLEAF_READ_TOKEN') {
    console.warn('CV Download: Overleaf read token not configured. Please set OVERLEAF_READ_TOKEN in cv-download.js');
    return;
  }

  // Use event delegation on document body to catch clicks on Resume link
  // This works even if the link is added dynamically or script loads before the link exists
  console.log('CV Download: Setting up event listener');
  
  // Wait for DOM to be ready before setting up listener
  function setupListener() {
    console.log('CV Download: DOM ready, attaching click listener');
    document.addEventListener('click', async function(e) {
    // Find the clicked link element
    let target = e.target;
    
    // Traverse up the DOM tree to find the anchor tag
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }
    
    if (!target || !target.href) {
      return;
    }
    
    // Check if this is the Resume link
    const href = target.getAttribute('href') || target.href;
    const isResumeLink = href.includes('#resume') || href.includes('resume');
    
    // Also check by text content or icon
    const text = target.textContent.trim().toLowerCase();
    const hasResumeIcon = target.querySelector('i.fa-file-pdf');
    const isResumeByContent = (text === 'resume' || text.includes('resume')) && hasResumeIcon;
    
    if (!isResumeLink && !isResumeByContent) {
      return;
    }
    
    console.log('CV Download: Resume link clicked!', href);
    
    // Prevent default navigation
    e.preventDefault();
    e.stopPropagation();
    
    const resumeLink = target;
    const originalHTML = resumeLink.innerHTML;
    const originalTitle = resumeLink.title || '';
    
    // Show loading state
    resumeLink.style.opacity = '0.6';
    resumeLink.style.pointerEvents = 'none';
    resumeLink.title = 'Fetching CV...';
    
    // Try to find and update the icon if it exists
    const icon = resumeLink.querySelector('i');
    const originalIconClass = icon ? icon.className : null;
    if (icon) {
      icon.className = 'fas fa-spinner fa-spin';
    }

    try {
      console.log('CV Download: Fetching PDF from Overleaf...');
      // Import and use compile-overleaf module
      const { default: compileOverleaf } = await import('https://cdn.skypack.dev/compile-overleaf');
      
      // Compile and get PDF link
      const compiled = await compileOverleaf(OVERLEAF_READ_TOKEN);
      const pdfLink = compiled.link.pdf;
      console.log('CV Download: PDF link obtained:', pdfLink);

      // Trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfLink;
      downloadLink.download = 'Muhammad_Arham_CV.pdf';
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      console.log('CV Download: Download triggered');

      // Reset link state
      resumeLink.innerHTML = originalHTML;
      resumeLink.style.opacity = '1';
      resumeLink.style.pointerEvents = 'auto';
      resumeLink.title = originalTitle;
    } catch (error) {
      console.error('CV Download: Error downloading CV:', error);
      
      // Show error state
      if (icon && originalIconClass) {
        icon.className = 'fas fa-exclamation-triangle';
      }
      resumeLink.title = 'Error downloading CV. Click to try again.';
      
      // Reset after 3 seconds
      setTimeout(() => {
        resumeLink.innerHTML = originalHTML;
        resumeLink.style.opacity = '1';
        resumeLink.style.pointerEvents = 'auto';
        resumeLink.title = originalTitle;
      }, 3000);

      // Show user-friendly error message
      alert('Failed to download CV. Please try again later or contact me directly.');
    }
    }, true); // Use capture phase to catch the event early
  }
  
  // Setup listener when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupListener);
  } else {
    setupListener();
  }
})();

