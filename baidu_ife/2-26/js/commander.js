/**
 * Created by hansneil on 26/3/16.
 */
/**
 * commander 指挥官单例对象, 用于发送指令, 与DOM的按钮绑定
  * @type {{spaceCraft: *[], mediator: ({msgArr, spaceCraft, renderConsole, addOneCraft, removeOneCraft, performOneCommander, init}|{msgArr: Array, spaceCraft: *[], renderConsole: renderConsole, addOneCraft: addOneCraft, removeOneCraft: removeOneCraft, performOneCommander: performOneCommander, init: init}), addCraft: commander.addCraft, performCommand: commander.performCommand, removeCraft: commander.removeCraft, init: commander.init}}
 */
var commander = {
    //指挥官认为自己启动的飞船, 由于丢包率, 会与mediator有出入
    spaceCraft: [createCraft(1), createCraft(2)],
    //获得mediator对象
    mediator: mediator(),
    /**
     * addCraft 向Mediator发送添加飞船的指令
     * 如果飞船数量超过4个, 则给出警告
     */
    addCraft: function(){
        var len = this.spaceCraft.length;
        var craft;
        if (len < 4) {
            var controlButton = document.querySelectorAll(".craft-control");
            for (var i = 0; i < 4; i++) {
                var arr = this.spaceCraft.filter(function(item) {
                    return item.order == i+1;
                });
                if (!arr.length) {
                    break;
                }
            }
            controlButton[i].className = "craft-control";
            controlButton[i].querySelector(".start").style.display = "block";
            controlButton[i].querySelector(".stop").style.display = "block";
            craft = createCraft(i+1);
            this.spaceCraft.push(craft);
            this.mediator.addOneCraft(craft);
            var html = "[指挥官]:" + (i+1) +"号轨道添加飞船的指令已发送";
            this.mediator.renderConsole(html, true);
        } else {
            var html = "[指挥官]:轨道已满,请先销毁飞船!!!";
            this.mediator.renderConsole(html);
        }
    },
    /**
     * performCommand 发出相应的指令
     * @param command
     */
    performCommand: function(command) {
        if (command.command == "destory") {
            var html = "[指挥官]:" + command.id +"号飞船摧毁指令已发送";
            this.mediator.renderConsole(html, true);
            this.removeCraft(command.id);
        } else if (command.command == "start") {
            var html = "[指挥官]:" + command.id +"号飞船飞行指令已发送";
            this.mediator.renderConsole(html, true);
        } else {
            var html = "[指挥官]:" + command.id + "号飞船停止指令已发送";
            this.mediator.renderConsole(html, true);
        }
        this.mediator.performOneCommander(command);
    },
    /**
     * removeCraft, 当指挥官发出摧毁指令后调用该函数删除飞船
     * @param craft
     */
    removeCraft: function(craft){
        var crafts = this.spaceCraft;
        for (var i = 0, len = crafts.length; i < len; i++) {
            if (crafts[i].order == craft) {
                break;
            }
        }
        var controlButton = document.querySelectorAll(".craft-control");
        controlButton[craft-1].className += " hidden";
        crafts.splice(i, 1);
    },
    /**
     * init: 初始化函数
     */
    init: function(){
        this.mediator.init();
    }
};
