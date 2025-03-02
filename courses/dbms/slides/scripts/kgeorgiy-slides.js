w3c_slidy.table_of_contents = function () {
    var toc = this.create_element("div");
    this.add_class(toc, "slidy_toc hidden");

    var heading = this.create_element("div");
    this.add_class(heading, "toc-heading");
    heading.innerHTML = this.localize("Table of Contents");

    toc.appendChild(heading);
    var previous = null;

    var list = this.create_element("ol");
    toc.appendChild(list);

    for (var i = 0; i < this.slides.length; ++i) {
        var slide = this.slides[i];

        var item = this.create_element("li");
        list.appendChild(item);

        var a = this.create_element("a");
        a.setAttribute("href", "#(" + (i + 1) + ")");

        if (this.has_class(slide, "section")) {
            this.add_class(item, "section");
        }

        if (this.has_class(slide, "subsection")) {
            this.add_class(item, "subsection");
        }

        var name = document.createTextNode(this.slide_name(i));
        a.appendChild(name);
        a.onclick = w3c_slidy.toc_click;
        a.onkeydown = w3c_slidy.toc_key_down;
        a.previous = previous;

        if (previous)
            previous.next = a;

        item.appendChild(a);

        if (i == 0)
            toc.first = a;

        if (i < this.slides.length - 1) {
            var br = this.create_element("br");
            toc.appendChild(br);
        }

        previous = a;
    }

    toc.focus = function () {
        if (this.first)
            this.first.focus();
    }

    toc.onmouseup = w3c_slidy.mouse_button_up;

    toc.onclick = function (e) {
        e || (e = window.event);

        if (w3c_slidy.selected_text_len <= 0)
            w3c_slidy.hide_table_of_contents(true);

        w3c_slidy.stop_propagation(e);

        if (e.cancel != undefined)
            e.cancel = true;

        if (e.returnValue != undefined)
            e.returnValue = false;

        return false;
    };

    document.body.insertBefore(toc, document.body.firstChild);
    return toc;
}

w3c_slidy.old_reveal_next_item = w3c_slidy.reveal_next_item;
w3c_slidy.reveal_next_item = function (node) {
    if (node && node.nodeType == 1 && this.has_class(node, "only")) {
        this.add_class(node, "invisible");
    }

    return this.old_reveal_next_item(node);
}

w3c_slidy.old_hide_previous_item = w3c_slidy.hide_previous_item;
w3c_slidy.hide_previous_item = function (node) {
    node = this.old_hide_previous_item(node);
    if (node && node.nodeType == 1 && this.has_class(node, "only")) {
        this.remove_class(node, "invisible");
    }
    return node;
}

w3c_slidy.set_visibility_all_incremental = function (value) {
    var node = this.next_incremental_item(null);

    if (value == "hidden") {
        while (node) {
            w3c_slidy.add_class(node, "invisible");
            node = w3c_slidy.next_incremental_item(node);
        }
    } else { // value == "visible"
        while (node) {
            pnode = node;
            node = w3c_slidy.next_incremental_item(node);
            if (!node || !this.has_class(pnode, "only")) {
                w3c_slidy.remove_class(pnode, "invisible");
            }
        }
    }
}

w3c_slidy.want_toolbar = false;

function setScreenRatio(p, q) {
    const root = document.documentElement;
    root.style.setProperty('--b', `calc(min(100vw, 100vh * ${q} / ${p}) / 100)`, 'important');
    root.style.setProperty('--s', `calc(var(--b) * ${p} / ${q} * 4 / 3)`, 'important');
}

window.location.search.split(/[?&]/)
    .map(s => s.split("=", 2))
    .filter(([name, value]) => name == "bb")
    .forEach(([name, value]) => setScreenRatio(...value.split(/[/:]/, 2)));
