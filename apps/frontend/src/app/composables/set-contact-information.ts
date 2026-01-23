import { useLeadStore } from '../../stores/leadStore';

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
  console.log('Lead Information', store.lead);
}
