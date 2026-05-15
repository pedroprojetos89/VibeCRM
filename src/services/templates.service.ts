import { mockTemplates } from '../lib/mock-data';
import { MessageTemplate, TemplateType } from '../types';

export const templatesService = {
  getAllTemplates: async (): Promise<MessageTemplate[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTemplates;
  },

  getTemplate: async (type: TemplateType): Promise<MessageTemplate> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTemplates.find(t => t.type === type)!;
  },

  updateTemplate: async (type: TemplateType, body: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTemplates.findIndex(t => t.type === type);
    if (index !== -1) {
      mockTemplates[index].body = body;
      mockTemplates[index].updated_at = new Date().toISOString();
    }
  }
};
