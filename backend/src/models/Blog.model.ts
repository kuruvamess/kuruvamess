import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  featuredImage?: string;
  images?: string[];
  status: 'draft' | 'published';
  views: number;
  likes: number;
  readTime: number; // in minutes
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Kerala Food Stories',
      'Recipe Tips',
      'Restaurant Updates',
      'Kuruva Island Travel',
      'Health & Nutrition',
      'Food Culture',
      'Events'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: String,
  images: [String],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 5
  },
  metaTitle: String,
  metaDescription: String,
  publishedAt: Date
}, {
  timestamps: true
});

// Generate slug from title
BlogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }
  
  // Calculate read time based on content length
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  // Set published date when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Index for search
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });

export default mongoose.model<IBlog>('Blog', BlogSchema);
