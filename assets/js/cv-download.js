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
  const downloadButton = document.getElementById('downloadCV');
  if (!downloadButton) return;

  // Replace this with your Overleaf read token
  // Get it from your Overleaf project's shareable link
  const OVERLEAF_READ_TOKEN = 'wfxcvkkpztkk#b57beb';

  // Check if token is configured
  if (OVERLEAF_READ_TOKEN === 'YOUR_OVERLEAF_READ_TOKEN') {
    console.warn('CV Download: Overleaf read token not configured. Please set OVERLEAF_READ_TOKEN in cv-download.js');
    downloadButton.disabled = true;
    downloadButton.title = 'CV download not configured. Please contact the site administrator.';
    return;
  }

  downloadButton.addEventListener('click', async () => {
    const originalText = downloadButton.innerHTML;
    
    // Show loading state
    downloadButton.disabled = true;
    downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Fetching CV...';

    try {
      // Import and use compile-overleaf module
      const { default: compileOverleaf } = await import('https://cdn.skypack.dev/compile-overleaf');
      
      // Compile and get PDF link
      const compiled = await compileOverleaf(OVERLEAF_READ_TOKEN);
      const pdfLink = compiled.link.pdf;

      // Trigger download
      const link = document.createElement('a');
      link.href = pdfLink;
      link.download = 'Muhammad_Arham_CV.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset button
      downloadButton.innerHTML = originalText;
      downloadButton.disabled = false;
    } catch (error) {
      console.error('Error downloading CV:', error);
      
      // Show error state
      downloadButton.innerHTML = '<i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>Error - Try Again';
      downloadButton.disabled = false;
      
      // Reset after 3 seconds
      setTimeout(() => {
        downloadButton.innerHTML = originalText;
      }, 3000);

      // Optional: Show user-friendly error message
      alert('Failed to download CV. Please try again later or contact me directly.');
    }
  });
});

