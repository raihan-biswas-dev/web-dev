//Name: Santoshi Lamichhane
//Student ID: 100915340

export const StorageService = {
    saveContactData: function(contactData) {
        localStorage.setItem('contactData', JSON.stringify(contactData));
        
        

    },
    

    getContactData: function() {
        const data = localStorage.getItem('contactData');
        return JSON.parse(data);
    },

    clearContactData: function() {
        localStorage.removeItem('contactData');
    }
};
