/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: feerecords
 * Interface for FeeRecords
 */
export interface FeeRecords {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  studentName?: string;
  /** @wixFieldType number */
  amountDue?: number;
  /** @wixFieldType number */
  amountPaid?: number;
  /** @wixFieldType date */
  nextDueDate?: Date | string;
  /** @wixFieldType text */
  paymentStatus?: string;
  /** @wixFieldType datetime */
  transactionDate?: Date | string;
}


/**
 * Collection ID: foodmenu
 * Interface for FoodMenu
 */
export interface FoodMenu {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  dayOfWeek?: string;
  /** @wixFieldType text */
  breakfastItems?: string;
  /** @wixFieldType text */
  lunchItems?: string;
  /** @wixFieldType text */
  dinnerItems?: string;
  /** @wixFieldType text */
  specialItems?: string;
}


/**
 * Collection ID: hostels
 * @catalog This collection is an eCommerce catalog
 * Interface for Hostels
 */
export interface Hostels {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  amenities?: string;
  /** @wixFieldType number */
  itemQuantity?: number;
  /** @wixFieldType text */
  locationAddress?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
}


/**
 * Collection ID: rooms
 * Interface for Rooms
 */
export interface Rooms {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roomNumber?: string;
  /** @wixFieldType text */
  hostelName?: string;
  /** @wixFieldType number */
  totalBeds?: number;
  /** @wixFieldType number */
  floorLevel?: number;
  /** @wixFieldType text */
  roomType?: string;
  /** @wixFieldType text */
  layoutDescription?: string;
}


/**
 * Collection ID: students
 * Interface for Students
 */
export interface Students {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  studentName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePhoto?: string;
  /** @wixFieldType text */
  collegeName?: string;
  /** @wixFieldType number */
  yearOfStudy?: number;
  /** @wixFieldType date */
  stayingSince?: Date | string;
  /** @wixFieldType text */
  roomNumber?: string;
  /** @wixFieldType text */
  parentName?: string;
  /** @wixFieldType text */
  parentContactInfo?: string;
}
