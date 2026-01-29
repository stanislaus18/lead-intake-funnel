import { useLeadStore } from '../../stores/leadStore';
import { apiService } from '../service';

export interface URL {
  id: IDBValidKey;
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

export function setContactInformation(
  contactInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  },
  project: Project,
) {
  store.lead = {
    version: '1.0.2',
    ...store.lead,
    contact: { ...store.lead.contact, contactInformation: contactInformation },
    project: {
      ...store.lead.project,
      pictures: project.pictures,
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
