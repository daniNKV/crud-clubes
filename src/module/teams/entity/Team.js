module.exports = class Team {
    constructor({
        id,
        area,
        name,
        shortName,
        tla,
        crestUrl,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue,
        lastUpdated,
    }) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.tla = tla;
        this.crestUrl = crestUrl;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.email = email;
        this.founded = founded;
        this.clubColors = clubColors;
        this.venue = venue;
        this.lastUpdated = lastUpdated;
        this.area = area;
    }
};
