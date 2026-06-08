import { createClient } from '@supabase/supabase-js';

// Substitua as strings abaixo pelos dados reais do seu projeto no Supabase
const supabaseUrl = 'https://tjvdivokwjuppmylurvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdmRpdm9rd2p1cHBteWx1cnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDY4NTEsImV4cCI6MjA5NjUyMjg1MX0.4H58AOafZ1223tZGsA3NhAxmLjumDlPWwkLCl4wMLkk';

// Exporta a conexão para ser usada em todo o site
export const supabase = createClient(supabaseUrl, supabaseAnonKey);