
// $("h1").animate({left: '250'})

let sheetUrl = "https://docs.google.com/spreadsheets/d/1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ/edit?usp=sharing"

let sheetID = "1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ"

let sheetAsJSON = "https://spreadsheets.google.com/feeds/list/1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ/od6/public/values?alt=json"


const render = (projectsArr) => {
    projectsArr.forEach(elem => {
        const $div = $('<div class="indivProj"></div>')
        $('div.portContainer').append($div)

        const $previewDiv = $(`<div class="previewDiv"></div>`)
        $previewDiv.attr('href', elem.link)
        $($div).append($previewDiv)

            const $p = $(`<p class="title">${elem.title}</p>`)
            $($previewDiv).append($p)

            const $img = $('<img class="projImg">')
            $img.attr('src', elem.image).attr('alt', 'project preview')
            $($previewDiv).append($img)

        //  add div for hover opacity
            const $view = $('<div class="view"></div>')
            $view.text("View Project")
            $($previewDiv).append($view)
        
        const $techDiv = $('<div class="techDiv"></div>')
        $($div).append($techDiv)

            const $p2 = $(`<p class="technology">${elem.technology}</p>`)
            $($techDiv).append($p2)

            const $arrow = $('<i class="fas fa-angle-double-down"></i>')
            $($techDiv).append($arrow)


           

        // const $button = $('<button></button>')
        // $button.text("button")
        // $($div).after($button)
        $arrow.click(function() {
            $($p3).toggle()
        })

        const $p3 = $(`<p class="description">${elem.description}</p>`)
        $($div).append($p3)

        

        $previewDiv.click(function () {
            window.location = $(this).attr('href');

        
        $p2.click(function() {
                $($p3).toggle()
            })
        

        });
    })
}

$.ajax({ url: sheetAsJSON })
    .then(data => {
        const projects = data.feed.entry.map(project => {
            return {
                title: project.gsx$title.$t,
                image: project.gsx$image.$t,
                technology: project.gsx$technology.$t,
                link: project.gsx$link.$t,
                description: project.gsx$description.$t
            }
        })
        render(projects)
    })

//jquery to on click show menu block. watched Alex's video.
const $menuIcon = $('.menuItems i')
const $a = $('.menuLink')
let show = true;

//handler for click event
const showMenu = (event) => {
    if (show) {
        $a.each(function (index) {
            $(this).css('display', 'block')
        })
        show = false
    } else {
        $a.each(function (index) {
            $(this).css('display', 'none')
        })
        show = true
    }
}
$menuIcon.on('click', showMenu)


if ($(window).width() < 769) {
    const hideMenu = (event) => {
        $a.each(function (index) {
            $(this).css('display', 'none')
        })
        show = true
    }
    $a.on('click', hideMenu)
}

// function copyToClipboard(element) {
//     var $temp = $("<input>");
//     $("body").append($temp);
//     $temp.val($(element).text()).select();
//     document.execCommand("copy");
//     $temp.remove();
// }
