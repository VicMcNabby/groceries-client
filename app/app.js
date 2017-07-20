(function() {
  'use strict';

  angular
    .module('listApp', [])
    .component('list', {
      controller: controller,
      templateUrl: 'app/templates/list.html'
    })
    controller.$inject = ['$http']
    function controller($http) {
      const vm = this;

      vm.$onInit = function() {
        const itemsURL = 'http://localhost:3000/api/v1/items'

        $http.get(itemsURL)
        .then(results => {
          console.log(results);
        })
        vm.items = [];
      };

      vm.addItem = function() {
        if (vm.newItem && vm.newItem.title && vm.newItem.aisle) {
          vm.items.push({
            title: vm.newItem.title,
            aisle: vm.newItem.aisle
          })
          vm.newItem = {
            title: '',
            aisle: ''
          }
        };
      };

      vm.markDone = function(item) {
        console.log(item);
        item.done = true;
      };

      vm.delete = function($index) {
        console.log('index: ', $index);
        console.log(vm.items);
        vm.items.splice($index, 1)
      };

    }
})();
