module.exports = class League {
    constructor(
        id,
        name,
        tla,
        flag,
        website,
        founded,
        startDate,
        endDate,
    ) {
        this.id = id;
        this.name = name;
        this.tla = tla;
        this.flag = flag;
        this.website = website;
        this.founded = founded;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
