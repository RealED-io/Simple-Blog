import { supabase } from '../supabaseClient.ts';

export interface Blog {
  id: string;
  title: string;
  content: string;
  is_public: boolean;
  author: string;
  user_id: string;
  created_at: string;
}

export const blogService = {
  async create(blog: Omit<Blog, 'id' | 'created_at' | 'author'>): Promise<Blog> {
    const { data, error } = await supabase.from('blogs').insert(blog).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  async get(id: string) {
    const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, blog: Partial<Blog>): Promise<void> {
    const { error } = await supabase.from('blogs').update(blog).eq('id', id);
    if (error) throw new Error(error.message);
  },

  async delete(id: string) {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;
  },

  async list({
    page = 1,
    limit = 3,
    filter = 'public',
  }: {
    page?: number;
    limit?: number;
    filter?: 'public' | 'user' | 'all';
  }) {

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('blog_with_author')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (filter === 'public') {
      query = query.eq('is_public', true);
    } else if (filter === 'user') {
      const user = (await supabase.auth.getUser()).data.user;
      query = query.eq('user_id', user?.id);
    }

    const { data, count, error } = await query;
    if (error) throw new Error(error.message);
    return { blogs: data ?? [], total: count ?? 0 };
  },
};
