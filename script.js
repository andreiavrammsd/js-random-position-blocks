var wrapper = $('#wrapper'),
    width = wrapper.width(),
    height = wrapper.height(),
    coords = [],
    minNumberOfBlocks = 5,
    maxNumberOfBlocks = 12,
    blockW = 30,
    blockH = 25,
    xMin = 1,
    xMax = width - blockW - 1,
    yMin = 1,
    yMax = height - blockH - 1,
    coeffX = 10,
    coeffY = 1,
    xMinDistance = blockW + coeffX,
    yMinDistance = blockH + coeffY,
    blockTemplate = '<span class="block"></span>';

var generate = function () {
    var numberOfBlocks = getNumberOfBlocks();

    validateBlocksConfig(numberOfBlocks);

    coords = [];
    for (var i = 0; i < numberOfBlocks; i++) {
        coords.push(newCoord(i));
    }

    $('.block').remove();

    $(coords).each(function (i, position) {
        var block = getBlock(i, position);
        wrapper.append(block);
    })
}

var getNumberOfBlocks = function () {
    var numberOfBlocks = parseInt($('#number_of_blocks').val());
    if (isNaN(numberOfBlocks) || numberOfBlocks < minNumberOfBlocks || numberOfBlocks > maxNumberOfBlocks) {
        numberOfBlocks = maxNumberOfBlocks;
    }

    return numberOfBlocks;
}

var validateBlocksConfig = function (numberOfBlocks) {
    var sumX = numberOfBlocks * blockW + xMin + width - xMax + numberOfBlocks * coeffX,
        sumY = numberOfBlocks * blockH + yMin + height - yMax + numberOfBlocks * coeffY;

    if (sumX >= width || sumY > height) {
        alert('Bad config: sum x: ' + sumX + '; sum y:' + sumY);
    }
}

var newCoord = function (id) {
    do {
        var x = random(xMin, xMax);
        var y = random(yMin, yMax);

        if (x < xMin || x > xMax || y < yMin || y > yMax) {
            continue;
        }

        var repeat = false;
        $(coords).each(function (i, coord) {
            if (Math.abs(x - coord.x) < xMinDistance || Math.abs(y - coord.y) < yMinDistance) {
                repeat = true;
                return false;
            }
        });

        if (repeat) {
            continue;
        }

        break;
    } while (true);

    return {
        id: '_' + id,
        x: x,
        y: y
    };
}

var random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var getBlock = function (i, position) {
    return $(blockTemplate)
        .attr('id', position.id)
        .css({
            left: position.x,
            top: position.y,
            width: blockW + 'px',
            height: blockH + 'px'
        })
        .attr('id', position.id)
        .data('x', position.x)
        .data('y', position.y)
        .text(i + 1)
}

$(document).ready(function () {
    generate();

    $('#generate').on('click', function () {
        generate();
    })
})
