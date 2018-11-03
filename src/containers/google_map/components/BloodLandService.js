var BloodLandService = window.BloodLandService = {};

var requestIdForPurchasedLand = 0;

//var requestPurchasedLand = 
BloodLandService.requestPurchasedLand = function(bounds, callback, delay) {

    var requestId = ++requestIdForPurchasedLand;

    // TODO: Remove: Fake data
    // Key is quadKey, quadKey must be 23 numeric charactor.
    var samplePurchasedLand = {
        '13223011132101320010': {'owner': 'santa', 'updatedDate': 1525864917694, 'ad': {'type': 'text', 'contents': '굽네 치킨 090-9999-9999'}},
        '13223011132101320011': {'owner': 'santa', 'updatedDate': 1525864917694, 'ad': {'type': 'text', 'contents': '이수근 대리운전 1577-1577'}},
        '13223011132101320012': {'owner': 'santa', 'updatedDate': 1525864917694, 'ad': {'type': 'html', 'contents': '<svg width="60" height="60" viewBox="-1 -1 2 2" style="position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; margin-left: -30px; margin-top: -30px;"><path d="M 1 0 A 1 1 0 1 1 0.6 -0.8 L 0 0" style="fill: #FFC800;"></path><path d="M 1 0 A 1 1 0 0 0 -0.6 -0.8 L 0 0" style="fill: #FF6400;"></path><text x="-1" y="1" font-size="0.5">PIZZA</text></svg>'}},
        '13223011132101301100000': {'owner': 'kosooyoul', 'updatedDate': 1525864917694, 'ad': {'type': 'image', 'contents': 'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAxODAxMDlfMjAy%2FMDAxNTE1NDY2OTU3MzU5.RvAjafDF9V-E6uWFDixmqrnj1QQyWr0dJYLyYruTBjQg.c8uVDh6ZakMynNU1JfX5t3vksPimsav5lTqa8SV8_D8g.JPEG%2FIoZPBv2AhCsMc8bhO6jy6uFnMP24.jpg&type=b400'}},
        '13223011132101301121210': {'owner': 'netcoya', 'updatedDate': 1525864417694, 'ad': {'type': 'image', 'contents': 'https://i.ytimg.com/vi/qug7yvJyamI/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCTavaByquT3gwnz21y6i3PuM8fgQ'}},
        '13223011132101310200000': {'owner': 'angellee1004', 'updatedDate': 1525864907694},
        '13223011132101310300000': {'owner': 'santa', 'updatedDate': 1525864916694, 'ad': {'type': 'web', 'contents': 'http://www.ahyane.net/@webgl/sample.html'}},
        '13223011132101310310000': {'owner': 'santa', 'updatedDate': 1525864916694, 'ad': {'type': 'text', 'contents': '광고입니다11111111'}},
        '13223011132101310310001': {'owner': 'santa', 'updatedDate': 1525864916694, 'ad': {'type': 'text', 'contents': '광고입니다222222222222222'}},
        '13223011132101310310002': {'owner': 'santa', 'updatedDate': 1525864916694, 'ad': {'type': 'text', 'contents': '광고입니다333333333333333333333333333'}},
        '13223011132101310310003': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310010': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310011': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310012': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310013': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310020': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310021': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310022': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310023': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310030': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310031': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310032': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310310033': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310320000': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330000': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101301110000': {'owner': 'kosooyoul', 'updatedDate': 1525864917694},
        '13223011132101310010000': {'owner': 'netcoya', 'updatedDate': 1525864417694, 'ad': {'type': 'web', 'contents': 'https://www.youtube.com/embed/dpXpxlwATRA?autoplay=1&showinfo=0&controls=0&list=PLJgHtU-k6fIR1_X7y027zjo5WOcQfepLP&modestbranding=1&loop=1'}},
        '13223011132101310210000': {'owner': 'angellee1004', 'updatedDate': 1525864907694},
        '13223011132101301120000': {'owner': 'kosooyoul', 'updatedDate': 1525864917694},
        '13223011132101310030000': {'owner': 'netcoya', 'updatedDate': 1525864417694, 'ad': {'type': 'web', 'contents': 'https://www.youtube.com/embed/_GR2ZoEsDAE?autoplay=1&showinfo=0&controls=0&list=PLJgHtU-k6fIR1_X7y027zjo5WOcQfepLP&modestbranding=1&loop=1'}},
        '13223011132101310220000': {'owner': 'angellee1004', 'updatedDate': 1525864907694},
        '13223011132101301100001': {'owner': 'kosooyoul', 'updatedDate': 1525864917694},
        '13223011132101310000002': {'owner': 'netcoya', 'updatedDate': 1525864417694},
        '13223011132101310200003': {'owner': 'angellee1004', 'updatedDate': 1525864907694},
        '13223011132101310300001': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101301110002': {'owner': 'kosooyoul', 'updatedDate': 1525864917694},
        '13223011132101310010003': {'owner': 'netcoya', 'updatedDate': 1525864417694},
        '13223011132101310210001': {'owner': 'angellee1004', 'updatedDate': 1525864907694},
        '13223011132101301120003': {'owner': 'kosooyoul', 'updatedDate': 1525864917694},
        '13223011132101310030001': {'owner': 'netcoya', 'updatedDate': 1525864417694},
        '13223011132101310220002': {'owner': 'angellee1004', 'updatedDate': 1525864907694},
        '13223011132101310330003': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330010': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330011': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330012': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330110': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330111': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330211': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330310': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330311': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13223011132101310330312': {'owner': 'santa', 'updatedDate': 1525864916694},
        '13211032012010333102313': {
            'owner': 'santa',
            'updatedDate': 1525864916694,
            'ad': {
                'type': 'web',
                'contents': './widget/dicemenu/',
                'position': 'center',
                'size': {w: 500, h: 500}
            }
        },
        '13211032012010333212313': {
            'owner': 'santa',
            'updatedDate': 1525864916694,
            'ad': {
                'type': 'web',
                'contents': './widget/dicemenu/',
                'position': 'center',
                'size': {w: 500, h: 500}
            }
        },
        '13211032012010333212312': {
            'owner': 'netcoya',
            'updatedDate': 1525864417694,
            'ad': {
                'type': 'slide',
                'contents': [
                    './demo/sample/images/card.png',
                    './demo/sample/images/cert.png'
                ]
            }
        },
    };

    setTimeout(function() {
        // If not same, this request is not necessary
        if (requestId !== requestIdForPurchasedLand) {
            return;
        }

        // TODO: Remove: Fake xhr
        // request bounds from server
        setTimeout(function() {
            callback && callback({'land': samplePurchasedLand});
        }, 200);

    }, delay);
};

var requestIdForPublicAd = 0;
//var requestPublicAd = 
BloodLandService.requestPublicAd = function(bounds, callback, delay)
{
    var requestId = ++requestIdForPublicAd;

    // TODO: Remove: Fake data
    // Key is quadKey, quadKey must be 23 numeric charactor.
    var samplePublicAd = {
        // '13223011132101320010000': {'area': {'begin': '13223011132101302000000', 'end': '13223011132101303323332'}, 'type': 'web', 'contents': 'https://www.youtube.com/embed/UYFp8UqgJPI?autoplay=1&showinfo=0&controls=0&list=PLJgHtU-k6fIR1_X7y027zjo5WOcQfepLP&modestbranding=1&loop=1', 'owner': 'santa', 'updatedDate': 1525864917694},
        // '13223011132101310220002': {'area': {'begin': '13223011132101000000000', 'end': '13223011132101033333333'}, 'type': 'image', 'contents': 'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAxODAxMDlfMjAy%2FMDAxNTE1NDY2OTU3MzU5.RvAjafDF9V-E6uWFDixmqrnj1QQyWr0dJYLyYruTBjQg.c8uVDh6ZakMynNU1JfX5t3vksPimsav5lTqa8SV8_D8g.JPEG%2FIoZPBv2AhCsMc8bhO6jy6uFnMP24.jpg&type=b400', 'owner': 'kosooyoul', 'updatedDate': 1525864917694},
        // '13223011132101301100000': {'area': {'begin': '13223011132101320010000', 'end': '13223011132101223010332'}, 'type': 'html', 'contents': '<div style="margin: 10px;"><h3 style="color: #000000;"><span>Global decentralized currency based on blockchain technology</span></h3><div>Oh, Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div></div>', 'owner': 'netcoya', 'updatedDate': 1525864417694},
        // '13223011132101310010000': {'area': {'begin': '13223011132101310010000', 'end': '13223011132101310013333'}, 'type': 'text', 'contents': '헌혈 안내 000-0000-0000', 'owner': 'angellee1004', 'updatedDate': 1525864907694}
    };

    setTimeout(function() {
        // If not same, this request is not necessary
        if (requestId !== requestIdForPublicAd) {
            return;
        }

        // TODO: Remove: Fake xhr
        // request bounds from server
        setTimeout(function() {
            callback && callback({'ad': samplePublicAd});
        }, 200);

    }, delay);
};

export default BloodLandService