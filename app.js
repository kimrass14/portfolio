console.log('app.js')

let sheetUrl = "https://docs.google.com/spreadsheets/d/1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ/edit?usp=sharing"

let sheetID = "1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ"

let sheetAsJSON = "https://spreadsheets.google.com/feeds/list/1deWdcbHJbl85QS8QRVPZafFzkD-kRn1SLpAUso8vTqQ/od6/public/values?alt=json"


const render = (projectsArr) => {
    projectsArr.forEach(elem => {
        console.log('projectsArr:', elem)
        const $div = $('<div class="indivProj"></div>')
        $div.attr('href', elem.link)
        $('div.portContainer').append($div)

        console.log('project link:', elem.link)

        const $img = $('<img class="projImg">')
        $img.attr('src', elem.image).attr('alt', 'project preview')
        $($div).html($img)

        const $p = $(`<p class="title">${elem.title}</p>`)
        $($div).append($p)

        $div.click(function () {
            window.location = $(this).attr('href');
        });
    })
}

$.ajax({ url: sheetAsJSON })
    .then(data => {
        const projects = data.feed.entry.map(project => {
            return {
                title: project.gsx$title.$t,
                image: project.gsx$image.$t,
                description: project.gsx$description.$t,
                link: project.gsx$link.$t,
            }
        })

        render(projects)
        console.log('these are the projects:', projects)
    })

//jquery to on click show menu block
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

//on click of menu item, menu disappears!!
const hideMenu = (event) => {
    $a.each(function (index) {
        $(this).css('display', 'none')
    })

}
$a.on('click', hideMenu)
