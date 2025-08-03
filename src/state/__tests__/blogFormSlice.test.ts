import blogFormSlice, { 
  updateField, 
  setCurrentPost, 
  clearForm, 
  savePost, 
  loadPosts, 
  deletePost,
  toggleDraft,
  BlogPost 
} from '../blogFormSlice';

describe('Blog Form Slice', () => {
  const initialState = {
    currentPost: {
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      author: '',
      summary: '',
      content: '',
      tags: [],
      isDraft: true,
    },
    posts: [],
    isEditing: false,
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = blogFormSlice(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('updateField', () => {
    it('should update a single field in currentPost', () => {
      const state = blogFormSlice(initialState, updateField({ 
        field: 'title', 
        value: 'New Post Title' 
      }));
      
      expect(state.currentPost.title).toBe('New Post Title');
    });

    it('should update multiple fields', () => {
      let state = blogFormSlice(initialState, updateField({ 
        field: 'title', 
        value: 'Test Title' 
      }));
      
      state = blogFormSlice(state, updateField({ 
        field: 'content', 
        value: 'Test content' 
      }));
      
      expect(state.currentPost.title).toBe('Test Title');
      expect(state.currentPost.content).toBe('Test content');
    });

    it('should update tags array', () => {
      const state = blogFormSlice(initialState, updateField({ 
        field: 'tags', 
        value: ['react', 'gatsby'] 
      }));
      
      expect(state.currentPost.tags).toEqual(['react', 'gatsby']);
    });
  });

  describe('setCurrentPost', () => {
    it('should set current post and enable editing mode', () => {
      const testPost: BlogPost = {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        date: '2024-01-01',
        author: 'Test Author',
        summary: 'Test summary',
        content: 'Test content',
        tags: ['test'],
        isDraft: false,
      };

      const state = blogFormSlice(initialState, setCurrentPost(testPost));
      
      expect(state.currentPost).toEqual(testPost);
      expect(state.isEditing).toBe(true);
    });
  });

  describe('clearForm', () => {
    it('should reset form to initial state', () => {
      const stateWithData = {
        ...initialState,
        currentPost: {
          title: 'Test Title',
          slug: 'test-slug',
          date: '2024-01-01',
          author: 'Test Author',
          summary: 'Test summary',
          content: 'Test content',
          tags: ['test'],
          isDraft: false,
        },
        isEditing: true,
      };

      const state = blogFormSlice(stateWithData, clearForm());
      
      expect(state.currentPost).toEqual(initialState.currentPost);
      expect(state.isEditing).toBe(false);
    });
  });

  describe('savePost', () => {
    it('should add new post to posts array', () => {
      const newPost: BlogPost = {
        id: '1',
        title: 'New Post',
        slug: 'new-post',
        date: '2024-01-01',
        author: 'Author',
        summary: 'Summary',
        content: 'Content',
        tags: ['tag1'],
        isDraft: false,
      };

      const state = blogFormSlice(initialState, savePost(newPost));
      
      expect(state.posts).toHaveLength(1);
      expect(state.posts[0]).toEqual(newPost);
      expect(localStorage.setItem).toHaveBeenCalledWith('blogPosts', JSON.stringify([newPost]));
    });

    it('should update existing post', () => {
      const existingPost: BlogPost = {
        id: '1',
        title: 'Original Post',
        slug: 'original-post',
        date: '2024-01-01',
        author: 'Author',
        summary: 'Summary',
        content: 'Content',
        tags: ['tag1'],
        isDraft: false,
      };

      const updatedPost: BlogPost = {
        ...existingPost,
        title: 'Updated Post',
        content: 'Updated content',
      };

      const stateWithPost = {
        ...initialState,
        posts: [existingPost],
      };

      const state = blogFormSlice(stateWithPost, savePost(updatedPost));
      
      expect(state.posts).toHaveLength(1);
      expect(state.posts[0]).toEqual(updatedPost);
      expect(localStorage.setItem).toHaveBeenCalledWith('blogPosts', JSON.stringify([updatedPost]));
    });
  });

  describe('loadPosts', () => {
    it('should load posts from localStorage', () => {
      const savedPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Saved Post',
          slug: 'saved-post',
          date: '2024-01-01',
          author: 'Author',
          summary: 'Summary',
          content: 'Content',
          tags: ['tag1'],
          isDraft: false,
        },
      ];

      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(savedPosts));

      const state = blogFormSlice(initialState, loadPosts());
      
      expect(state.posts).toEqual(savedPosts);
      expect(localStorage.getItem).toHaveBeenCalledWith('blogPosts');
    });

    it('should handle empty localStorage', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const state = blogFormSlice(initialState, loadPosts());
      
      expect(state.posts).toEqual([]);
    });
  });

  describe('deletePost', () => {
    it('should remove post from posts array', () => {
      const posts: BlogPost[] = [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          date: '2024-01-01',
          author: 'Author',
          summary: 'Summary',
          content: 'Content',
          tags: ['tag1'],
          isDraft: false,
        },
        {
          id: '2',
          title: 'Post 2',
          slug: 'post-2',
          date: '2024-01-02',
          author: 'Author',
          summary: 'Summary',
          content: 'Content',
          tags: ['tag2'],
          isDraft: false,
        },
      ];

      const stateWithPosts = {
        ...initialState,
        posts,
      };

      const state = blogFormSlice(stateWithPosts, deletePost('1'));
      
      expect(state.posts).toHaveLength(1);
      expect(state.posts[0].id).toBe('2');
      expect(localStorage.setItem).toHaveBeenCalledWith('blogPosts', JSON.stringify([posts[1]]));
    });

    it('should handle deleting non-existent post', () => {
      const posts: BlogPost[] = [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          date: '2024-01-01',
          author: 'Author',
          summary: 'Summary',
          content: 'Content',
          tags: ['tag1'],
          isDraft: false,
        },
      ];

      const stateWithPosts = {
        ...initialState,
        posts,
      };

      const state = blogFormSlice(stateWithPosts, deletePost('999'));
      
      expect(state.posts).toEqual(posts);
    });
  });

  describe('toggleDraft', () => {
    it('should toggle draft status of post', () => {
      const posts: BlogPost[] = [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          date: '2024-01-01',
          author: 'Author',
          summary: 'Summary',
          content: 'Content',
          tags: ['tag1'],
          isDraft: true,
        },
      ];

      const stateWithPosts = {
        ...initialState,
        posts,
      };

      const state = blogFormSlice(stateWithPosts, toggleDraft('1'));
      
      expect(state.posts[0].isDraft).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith('blogPosts', JSON.stringify([{ ...posts[0], isDraft: false }]));
    });

    it('should handle toggling non-existent post', () => {
      const posts: BlogPost[] = [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          date: '2024-01-01',
          author: 'Author',
          summary: 'Summary',
          content: 'Content',
          tags: ['tag1'],
          isDraft: true,
        },
      ];

      const stateWithPosts = {
        ...initialState,
        posts,
      };

      const state = blogFormSlice(stateWithPosts, toggleDraft('999'));
      
      expect(state.posts).toEqual(posts);
    });
  });
}); 