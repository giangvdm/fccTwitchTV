var App = {
    api: "https://wind-bow.gomix.me/twitch-api/streams/",
    suffixForJSONP: "?callback=?",
    channels: ["freecodecamp", "bananaslamjamma", "monstercat", "rocketjumpninja", "goldglove"],
    selectFilter(filterId) {
        // Remove selection of all filter options, then add select the desired one
        for (var i = 0; i < $(".filter__option").length; i++) {
            if ($(".filter__option").eq(i).hasClass("filter-selected")) {
                $(".filter__option").eq(i).removeClass("filter-selected");
                break;
            }
        }
        $("#" + filterId).addClass("filter-selected");
    },
    clearListOfChannels() {
        var channelsToBeRemoved = $(".channel-list__channel");
        for (var i = 0; i < channelsToBeRemoved.length; i++) {
            channelsToBeRemoved[i].remove();
        }
    },
    getChannels(filter) {
        function constructChannel(res, filter) {
            var channel = "";
            try {
                var channelInfo = res.stream.channel;
            }
            catch (err) { }
            if (channelInfo !== undefined) { // if channel is online
                if (filter === "js-offline") return; // but if user requires online channel(s) only, then quit
                // Channel modifier = online
                channel += "<div class='channel-list__channel channel-list__channel--online'>&nbsp;"
                // Channel Logo
                channel += "<img class='channel__logo' alt='" + channelInfo.name + "' src='" + channelInfo.logo + "'>";
                // Channel Name (anchor)
                channel += "<a class='channel__name' target='_blank' href='" + channelInfo.url + "'>" + channelInfo.display_name + "</a>";
                // Channel Status
                channel += "<p class='channel__status--online'>" + channelInfo.game + ": " + channelInfo.status + "</p>";
                channel += "</div>"; // closing tag
                // completed
            }
            else { // offline
                if (filter === "js-online") return; // but if user requires offline channel(s) only, then quit
                // Channel modifier = offline
                channel += "<div class='channel-list__channel channel-list__channel--offline'>&nbsp;"
                // Channel Logo = Unlink icon
                channel += "<img class='channel__logo' alt='offline' + src='https://dummyimage.com/300x300/000/fff.png&text=offline'>";
                // Channel Name
                var channelUrl = res._links.channel;
                var lastSlashIndex = channelUrl.lastIndexOf("/");
                var channelName = channelUrl.slice(lastSlashIndex + 1);
                channel += "<a class='channel__name' target='_blank' href='" + "https://twitch.tv/" + channelName + "'>" + channelName + "</a>";
                // Channel Status
                channel += "<p class='channel__status--offline'>Offline</p>";
                channel += "</div>"; // closing tag
                // completed
            }
            $(".channel-list").append(channel); // add it to the list
        }
        for (var i = 0; i < this.channels.length; i++) {
            $.getJSON(this.api + this.channels[i] + this.suffixForJSONP, function (data) {
                // console.log(data);
                constructChannel(data, filter);
            });
        }
    }
}

// Add event listener for filter buttons
for (var i = 0; i < $(".filter__option").length; i++) {
    $(".filter__option").eq(i).on("click", function () {
        App.selectFilter(this.id);
        App.clearListOfChannels();
        App.getChannels(this.id);
    });
}

// First time call
App.getChannels();