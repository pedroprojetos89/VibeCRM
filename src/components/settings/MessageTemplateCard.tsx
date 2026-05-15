import React, { useState } from 'react';
import { LucideIcon, Save, Info, Eye } from 'lucide-react';
import { MessageTemplate } from '../../types';
import { interpolateTemplate } from '../../lib/whatsapp';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface MessageTemplateCardProps {
  key?: string;
  template: MessageTemplate;
  icon: any;
  iconColor: string;
  onSave: (type: string, body: string) => Promise<void>;
}

export default function MessageTemplateCard({ template, icon: Icon, iconColor, onSave }: MessageTemplateCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(template.body);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(template.type, body);
    setIsSaving(false);
    setIsEditing(false);
  };

  const previewVariables = {
    '{nome}': 'Lucas',
    '{produto}': 'Curso Reels Pro',
    '{valor}': '197,00',
    '{link}': 'https://pay.exemplo.com/abc',
    '{desconto}': '15',
  };

  const insertVariable = (variable: string) => {
    setBody(prev => prev + ' ' + variable);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", iconColor)}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-slate-800">{template.label}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            title="Visualizar"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Corpo da Mensagem</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => setIsEditing(true)}
            className="w-full h-32 p-4 rounded-xl border border-slate-100 bg-slate-50/50 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/20 transition-all"
            placeholder="Digite sua mensagem de recuperação..."
          />
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Info className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-400">Variáveis disponíveis</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.available_variables.map((v) => (
                <button
                  key={v}
                  onClick={() => insertVariable(v)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold transition-colors"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showPreview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Preview (WhatsApp)</span>
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed italic">
                  {interpolateTemplate(body, previewVariables as Record<string, string>)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || body === template.body}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95",
            body === template.body 
              ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
              : "bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-md"
          )}
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Salvar Alterações</span>
        </button>
      </div>
    </div>
  );
}
