import { useLeadStore } from '../../stores/leadStore';
import { apiService } from '../service';

export interface URL {
  url: string;
}

export interface Pictures {
  outdoorUnitLocation: URL[];
  outdoorUnitLocationWithArea: URL[];
  heatingRoom: URL[];
  meterClosetWithDoorOpen: URL[];
  meterClosetSlsSwitchDetailed: URL[];
  floorHeatingDistributionWithDoorOpen: URL[];
}

export interface Project {
  pictures: Pictures;
}

const store = useLeadStore();

export function setContactInformation(contactInformation: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  project: Project;
}) {
  store.lead = {
    ...store.lead,
    contact: { ...store.lead.contact, contactInformation: contactInformation },
    project: {
      ...store.lead.project,
      pictures: contactInformation.project.pictures,
    },
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
