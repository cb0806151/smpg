//const fs = require('fs');

const log = console.log;

var nativeColumns = [
    ['Yellow_Woodsorrel', 'Purple_Archangel', 'Buckbrush'],
    ['Mayapple', 'Giant_Ironweed', 'Common_Ragweed'],
    ['Pokeweed', 'Rue_Anemone','False_Garlic'],
    ['Spring_Beauty', 'Horsenettle']
]

var nativeColumnsLatin = [
    ['Oxalis_Stricta', 'Lamium_purpureum', 'Symphoricarpos_orbiculatus'],
    ['Podophyllum', 'Vernonia_gigantea', 'Ambrosia_artemisiifolia'],
    ['Phytolacca_americana', 'Thalictrum_thalictroides','Nothoscordum_bivalve'],
    ['Claytonia_Virginica', 'Solanum_carolinense']
]
var nonNativeColumns = [
    ['Birdeye_Speedwell', 'Hairy_Buttercup', 'White_Clover'],
    ['Dandelion', 'Henbit_Deadnettile', 'Broadleaf_Plantain'],
    ['Ladys_Thumb', 'Galium_Aparine', 'Chickweed'],
    ['Crabgrass','Yellow_Foxtail','Smartweed'],
    ['Dayflower','Lambsquarter','Mulberry_Weed'],
    ['Prickly_Lettuce','Bull_Thistle','Common_Burdock'],
    ['Curly_Dock','Groundsel','Goose_Grass'],
    ['Allium_Vinaele','Allium_Canadese','Mock_Strawberry'],
    ['Johnson_Grass','Horse_Weed','Glechoma_Hederacea'],
    ['Hairy_Bittercress','Grape_Hyacinth','L. Maackii'],
    ['L. Morrowii','Black_Medic','Common_Purslane'],
    ['Queen_Anns_Lace','Common_Blue_Violet','Bluejacket'],
    ['Nap-at-noon']
]

var nonNativeColumnsLatin = [
    ['Veronica_persica','Ranunculus_sardous']
]

var invasivesColumns = []
var invasivesColumnsLatin = []
var all_columns;

$(document).ready(function(){

    $("#close_modal_button").on("click", function(){
        $("#floating_info_modal").removeClass('d-block');
        $("#floating_info_modal").addClass('d-none');
        $("#floating_info_container").removeClass('d-flex');
        $("#floating_info_container").addClass('d-none');
        $("#header_and_nav").height("7vh");
    });

    setNavButtonListeners();

    function fillPage(columns, page_name, latinNames) {
        for(i=0;i<columns.length;i++){
            for(j=0;j<columns[i].length;j++){
                let photo = columns[i][j];
                let row = i;
                let column = j
                log(photo)
                let plantName = photo.replace('_', ' ');
                $(`#${page_name}_c${i+1}`).append(`
                <img src="images/${photo}.jpg" id="${photo}_img" class="plant-image w-100 border">
                <p id="${photo}_img_text" class="pl-2 lead border" style="display: none;">${plantName}</p>
                `);
    
                $(`#${photo}_img`).mouseenter(function(){
                    $(`#${photo}_img_text`).slideDown();
                });
                $(`#${photo}_img`).mouseleave(function(){
                    $(`#${photo}_img_text`).slideUp();
                });


                // Open plants modal with info on that plant
                $(`#${photo}_img`).on("click", function(){
                    log(photo);
                    log(row);
                    log(column)
                    let latinName = latinNames[row][column];
                    log(latinName);
                    setPlantInfo(latinName);
                    $("#modal_info").html("")
                    $("#modal_photos").html("")
                    $("#floating_info_modal").addClass('d-block');
                    $("#floating_info_modal").removeClass('d-none');
                    $("#floating_info_container").addClass('d-flex');
                    $("#floating_info_container").removeClass('d-none');
                    $("#header_and_nav").height("100vh");
                });
            }
        }
    }

    function setPlantInfo(plantLatinName) {
        log(plantLatinName)
        let fetchData = $.get("https://en.wikipedia.org/api/rest_v1/page/mobile-html/" + plantLatinName, function(response) {
            $("#modal_info").html(response);
        });

        let fetchImageData = $.get("https://en.wikipedia.org/api/rest_v1/page/media/" + plantLatinName, function(response) {
            $("#modal_photos").html("")
            response.items.forEach(function(item) {
                console.log(item.original.source);
                if (item.original.source.indexOf(".tiff") === -1) {
                    $("#modal_photos").append(`<img src="${item.original.source}" class="w-100">`);
                }
            })
        })        
    }

    function fillColumns() {
        fillPage(nativeColumns, "native_plants_page", nativeColumnsLatin);
        fillPage(nonNativeColumns, "non_native_plants_page", nonNativeColumnsLatin);
        fillPage(invasivesColumns, "invasive_plants_page", invasivesColumnsLatin);
    }

    function setNavButtonListeners(){
        $("#home_link").on("click", function(){
            $("html,body").animate({
                scrollTop: 0
            },2000)
        });
    
        $("#native_plants_link").on("click", function(){
            $("html,body").animate({
                scrollTop: $("#native_plants_page").offset().top-80
            },2000)
        });
    
        $("#non_native_plants_link").on("click", function(){
            $("html,body").animate({
                scrollTop: $("#non_native_plants_page").offset().top-80
            },2000)
        });
    
        $("#invasives_link").on("click", function(){
            $("html,body").animate({
                scrollTop: $("#invasive_plants_page").offset().top-80
            },2000)
        });
    
        $("#all_plants_link").on("click", function(){
            $("html,body").animate({
                scrollTop: $("#all_plants_page").offset().top-80
            },2000)
        });
    }

    fillColumns();
});