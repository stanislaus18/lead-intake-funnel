import { useLeadStore } from '../../stores/leadStore';
import { apiService } from '../service';

const store = useLeadStore();

export function setContactInformation(contactInformation: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}) {
  store.lead = {
    ...store.lead,
    contact: { ...store.lead.contact, contactInformation: contactInformation },
  };
  apiService.postLeadIntakeFunnel(store.lead).subscribe({
    next: (data) => {
      console.log('Lead Information', data);
    },
    error: (err) => {
     // Handle error appropriately
     console.error('Error posting lead intake funnel:', err);
    },
  });
}
