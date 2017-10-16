(function() {
    function CollectionCtrl(Fixtures) {
        this.albumData = Fixtures.getCollection(12);
    }
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
