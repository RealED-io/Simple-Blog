import { supabase } from '../supabaseClient.ts';

export const blogService = {
  async create(title: string, content: string, isPublic: boolean) {
    const { error } = await supabase.from('blogs').insert([{ title, content, is_public: isPublic }]);
    if (error) throw error;
  },

  async get(id: string) {
    const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async update(id: string, title: string, content: string, isPublic: boolean) {
    const { error } = await supabase
      .from('blogs')
      .update({ title, content, is_public: isPublic })
      .eq('id', id);
    if (error) throw error;
  },

  async remove(id: string) {
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
    let query = supabase
      .from('blog_with_author')
      .select('*')
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false });

    if (filter === 'public') {
      query = query.eq('is_public', true);
    } else if (filter === 'user') {
      const user = (await supabase.auth.getUser()).data.user;
      query = query.eq('user_id', user?.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
};
