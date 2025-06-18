export class Service{
    async createPost({ title, slug, content, featuredImage, status, userId }) {
      try {
        const response = await fetch('http://localhost/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
          body: JSON.stringify({
            title,
            slug,
            content,
            featuredImage,
            status,
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }

        const data = await response.json();
        return data.post;

      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    
    async updatePost(id, data) {
      try {
        const response = await fetch(`http://localhost/blog/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
          body: JSON.stringify(data),
        });
      
        if (!response.ok) {
          throw new Error('Failed to update post');
        }
      
        return await response.json();
      } catch (error) {
        console.error('Error updating post:', error);
        return null;
      }
    }
    
    async deletePost(id) {
      try {
        const response = await fetch(`http://localhost/blog/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }else{
          return true;
        }

      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getPost(id) {
      try {
        const response = await fetch(`http://localhost/blog/${id}`, {
          method: 'GET',
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        return data.post;

      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getPosts() {
       try {
        const response = await fetch('http://localhost/blog', {
            method: 'GET',
            credentials: 'include', 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        return data.posts; 

      } catch (error) {
        console.error("getPosts error:", error);
        return [];
      }
    }   
    
    async uploadFile(file) {
      try {
        const formData = new FormData();
        formData.append('image', file); 

        const response = await fetch('http://localhost/blog/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        
        const data = await response.json();
        
        
        return data; 

      } catch (err) {
        console.error(err);
        throw err;
      }
    }

    async deleteFile(fileName) {
      try {
        fileName = fileName.substring(9, fileName.length);
        
        const response = await fetch(`http://localhost/blog/${fileName}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        
      
        if (!response.ok) {
          throw new Error('Failed to delete file');
        }
      
        const data = await response.json();
        return data;
      
      } catch (error) {
        console.error("deleteFile error:", error);
        return false;
      }
    }
}

const service = new Service();

export default service;