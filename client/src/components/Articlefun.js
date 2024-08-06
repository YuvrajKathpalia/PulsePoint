//save 
export const saveArticle = async (article) => {
    try {

        const token = localStorage.getItem('token');
       
        if (!token) {
      throw new Error('No token found. Please log in again.');  //can only save when you are logged in..
    }

      const response = await fetch('http://localhost:5000/api/articles/save-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save article');
      }
      
      alert('Article saved successfully'); //give alert.

    } 
    catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    }
  };
  

  //unsave...
  
  export const unsaveArticle = async (article) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
  
      const response = await fetch('http://localhost:5000/api/articles/unsave-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: article.title,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to unsave article');
      }
  
      alert('Article removed from saved articles'); // Give alert.
    } catch (error) {
      console.error('Error removing article:', error);
      alert('Failed to remove article');
    }
  };
  


  // share articlee


  export const shareArticleOnWhatsApp = (article) => {   //naye page pe khuljega whtsap pe shrne ke lie lie
    const { title, url } = article;
    const shareText = `Check out this article: ${title} - ${url}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappShareUrl, '_blank');
  };
  
  export const shareArticleOnTwitter = (article) => {
    const { title, url } = article;
    const shareText = `Check out this article: ${title} - ${url}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterShareUrl, '_blank');
  };
  
  
  export const shareArticleOnFacebook = (article) => {
    const { title, url } = article;
    const shareText = `Check out this article: ${title} - ${url}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookShareUrl, '_blank');
  };

  export const shareArticleOnInstagram = (article) => {  //insta pe seedha insta hi khulega..
    const instagramShareUrl = `https://www.instagram.com/`;
    window.open(instagramShareUrl, '_blank');
  };
  
  