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

document.addEventListener('DOMContentLoaded', () => {
  // Find the Resume link in the sidebar (by href="#resume")
  const resumeLink = document.querySelector('a[href="#resume"]');
  if (!resumeLink) {
    console.warn('CV Download: Resume link not found in sidebar');
    return;
  }

  // Replace this with your Overleaf read token
  // Get it from your Overleaf project's shareable link
  const OVERLEAF_READ_TOKEN = 'wfxcvkkpztkk';

  // Check if token is configured
  if (OVERLEAF_READ_TOKEN === 'YOUR_OVERLEAF_READ_TOKEN') {
    console.warn('CV Download: Overleaf read token not configured. Please set OVERLEAF_READ_TOKEN in cv-download.js');
    return;
  }

  resumeLink.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default navigation
    
    const originalHTML = resumeLink.innerHTML;
    const originalTitle = resumeLink.title || '';
    
    // Show loading state
    resumeLink.style.opacity = '0.6';
    resumeLink.style.pointerEvents = 'none';
    resumeLink.title = 'Fetching CV...';
    
    // Try to find and update the icon if it exists
    const icon = resumeLink.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-spinner fa-spin';
    }

    try {
      // Import and use compile-overleaf module
      const { default: compileOverleaf } = await import('https://cdn.skypack.dev/compile-overleaf');
      
      // Compile and get PDF link
      const compiled = await compileOverleaf(OVERLEAF_READ_TOKEN);
      const pdfLink = compiled.link.pdf;

      // Trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfLink;
      downloadLink.download = 'Muhammad_Arham_CV.pdf';
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Reset link state
      resumeLink.innerHTML = originalHTML;
      resumeLink.style.opacity = '1';
      resumeLink.style.pointerEvents = 'auto';
      resumeLink.title = originalTitle;
    } catch (error) {
      console.error('Error downloading CV:', error);
      
      // Show error state
      if (icon) {
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
  });
});

