let sheetUrl = "https://docs.google.com/spreadsheets/d/1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ/edit?usp=sharing"

let sheetID = "1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ"

let sheetAsJSON = "https://spreadsheets.google.com/feeds/list/1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ/od6/public/values?alt=json"


const render = (projectsArr) => {
    projectsArr.forEach(elem => {
        const $div = $('<div class="indivProj"></div>')
        $('div.portContainer').append($div)

        const $previewDiv = $(`<div class="previewDiv"></div>`)
        $($div).append($previewDiv)

            const $p = $(`<p class="title">${elem.title}</p>`)
            $($previewDiv).append($p)

            const $img = $('<img class="projImg">')
            $img.attr('src', elem.image).attr('alt', 'project preview')
            $($previewDiv).append($img)

            //for hover to click on link
            const $view = $('<a class="view">View Project</a>')
            $view.attr('href', elem.link).attr('target', '_blank')
            $($previewDiv).append($view)
        
        const $techDiv = $('<div class="techDiv"></div>')
        $($div).append($techDiv)

            const $p2 = $(`<p class="technology">${elem.technology}</p>`)
            $($techDiv).append($p2)

            const $arrow = $('<button><i class="fas fa-angle-double-down"></i></button>')
            $($techDiv).append($arrow)

            //on click of arrow shows project description
            $arrow.click(function() {
                $($p3).toggle()
            })
            const $p3 = $(`<p class="description">${elem.description}</p>`)
            $($div).append($p3)

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

//menu dropdown toggle
const $iconButton = $('.iconBtn')
const $a = $('.menuLink')
let show = true;

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
$iconButton.on('click', showMenu)

if ($(window).width() < 769) {
    const hideMenu = (event) => {
        $a.each(function (index) {
            $(this).css('display', 'none')
        })
        show = true
    }
    $a.on('click', hideMenu)
}
