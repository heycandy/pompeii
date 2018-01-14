var c_FRAMES_SIZE = 12;
var c_ZORDER_BOTTOM = 0;
var c_ZORDER_MID = 1;
var c_ZORDER_TOP = 2;
var c_OBSTACLE_GAP = 500;

var c_PLAY_STATE_IDLE = 0;
var c_PLAY_STATE_LEFT = -1;
var c_PLAY_STATE_RIGHT = 1;

var c_ROLE_DIRECTION_LEFT = 0;
var c_ROLE_DIRECTION_RIGHT = 1;
var c_ROLE_STATE_IDLE = 0;
var c_ROLE_STATE_RUN = 1;
var c_ROLE_STATE_LEAP = 2;
var c_ROLE_STATE_DIE = 3;

var v_PlayState = 0;
var v_PlaySpeed = 5;
var v_PlayDistance = 0;
var v_PlayGrade = 0;
var answerSelf

var QuestionAndAnswer = {
    questions: [
        '公元79年的火山喷发，导致庞贝古城被掩埋。这座爆发的火山是？',
        '庞贝极为著名的农产品有？',
        '罗马时期，庞贝人的社交活动不含下列哪一项？',
        '庞贝闻名世界的艺术有？',
        '罗马时期的“庞贝的女人”指的是哪位女神的特定版本？',
    ],
    options: [{
        'A': 'A 维苏威火山',
        'B': 'B 埃特纳火山',
        'C': 'C 梅扎马火山',
        'D': 'D 圣海伦斯火山'
    },
        {
            'A': 'A 辣椒和胡萝卜',
            'B': 'B 葡萄和番茄',
            'C': 'C 土豆和玉米',
            'D': 'D 无花果和南瓜'
        },
        {
            'A': 'A 戏剧表演',
            'B': 'B 角斗士表演',
            'C': 'C 举办舞会',
            'D': 'D 宗教仪式'
        },
        {
            'A': 'A 梭形陶器',
            'B': 'B 湿壁画',
            'C': 'C 大理石雕塑',
            'D': 'D 青铜烛台'
        },
        {
            'A': 'A 月亮女神塞勒涅',
            'B': 'B 大地之母盖亚',
            'C': 'C 海中女神涅锐伊得斯',
            'D': 'D 爱与美神维纳斯'
        }],
    answers: ['A', 'D', 'C', 'B', 'D']
}
