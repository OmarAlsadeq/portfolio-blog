import sequelize from './db';
import BlogPost from '@/models/BlogPost';
import Tag from '@/models/Tag';

// Define the associations after initializing models
export const initializeModels = () => {
  BlogPost.belongsToMany(Tag, { through: 'BlogPostTags', as: 'tags' });
  Tag.belongsToMany(BlogPost, { through: 'BlogPostTags', as: 'posts' });
};

// You can move the sequelize.sync call to your app's entry point
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Error syncing the database:', err);
  }
};

export { BlogPost, Tag };
