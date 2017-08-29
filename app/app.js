(function() {
  'use strict';

  angular
    .module('listApp', [])
    .component('list', {
      controller: controller,
      templateUrl: 'app/templates/list.html'
    })
    const itemsURL = 'https://grocery-list-api.herokuapp.com/api/v1/items'
    controller.$inject = ['$http']

    function controller($http) {
      const vm = this;

      vm.$onInit = function() {
        $http.get(itemsURL)
        .then(results => {
          vm.items = results.data
        })
        vm.items = [];
      };

      vm.addItem = function() {
        if (vm.newItem && vm.newItem.name && vm.newItem.aisle) {

          if(!vm.newItem.photo_url) {
            vm.newItem.photo_url = 'https://lifeinaalborg.files.wordpress.com/2014/08/groceries.jpg'
          }

          let info = {
            "name": vm.newItem.name,
            "aisle": vm.newItem.aisle,
            "photo_url": vm.newItem.photo_url
          }

          $http.post(itemsURL, info)
            .then(function(result){
            })

          vm.items.push({
            name: vm.newItem.name,
            aisle: vm.newItem.aisle,
            photo_url: vm.newItem.photo_url
          })

          vm.newItem = {
            name: '',
            aisle: '',
            photo_url: ''
          }
        };
      };

      vm.markDone = function(item) {
        console.log(item);
        item.done = true;
      };

      vm.editItem = function(item, $index) {
        let ID = item.id
        console.log(item, $index)
        let data = {
          "name": vm.editItem.name,
          "aisle": vm.editItem.aisle,
          "photo_url": vm.editItem.photo_url
        }
        console.log(data)
        // $http.put(`${itemsURL}/${ID}`, data)
        item.show = false
      }


      vm.openEdit = function(item) {
        item.show = true
        event.preventDefault();
      }

      vm.closeEditForm = function(item) {
        console.log(item);
        item.show = false
      }

      vm.delete = function(item) {
        let ID = item.id
        item.gone = true;
        $http.delete(`${itemsURL}/${ID}`)
        // vm.items.splice($index, 1)
      };

    }
})();
