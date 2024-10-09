import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@/lib/db';

// Define the attributes of a blog post
interface BlogPostAttributes {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional attributes for model creation (Sequelize will auto-generate the id)
interface BlogPostCreationAttributes extends Optional<BlogPostAttributes, 'id'> {}

// Define the model class extending Sequelize's Model
class BlogPost extends Model<BlogPostAttributes, BlogPostCreationAttributes> implements BlogPostAttributes {
  setTags(arg0: any[]) {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public slug!: string;
  public title!: string;
  public excerpt!: string;
  public content!: string;
  public createdAt!: Date;

  // timestamps!
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

// Initialize the model
BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'blogpost',
    timestamps: true,
  }
);


export default BlogPost;
