import React, { useState, useEffect } from 'react';
import { templatesService } from '../services/templates.service';
import { MessageTemplate } from '../types';
import MessageTemplateCard from '../components/settings/MessageTemplateCard';
import Toast from '../components/ui/Toast';
import { ShoppingCart, Hand, RefreshCw, Tag } from 'lucide-react';
import { motion } from 'motion/react';

const iconConfig = {
  abandoned_cart: { icon: ShoppingCart, color: 'bg-rose-500' },
  welcome: { icon: Hand, color: 'bg-emerald-500' },
  followup: { icon: RefreshCw, color: 'bg-amber-500' },
  promotion: { icon: Tag, color: 'bg-blue-500' },
};

export default function Settings() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

  const fetchData = async () => {
    setLoading(true);
    const data = await templatesService.getAllTemplates();
    setTemplates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (type: string, body: string) => {
    await templatesService.updateTemplate(type as any, body);
    setToast({ show: true, message: 'Template atualizado com sucesso!' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <header>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Configurações</h1>
        <p className="text-slate-400 mt-1">Personalize sua comunicação e templates oficiais.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[400px] bg-white rounded-2xl animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template) => {
            const config = iconConfig[template.type] || iconConfig.abandoned_cart;
            return (
              <MessageTemplateCard
                key={template.id}
                template={template}
                icon={config.icon}
                iconColor={config.color}
                onSave={handleSave}
              />
            );
          })}
        </div>
      )}

      <Toast 
        show={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </motion.div>
  );
}
