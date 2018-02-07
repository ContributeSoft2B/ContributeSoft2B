$(function () {
    $('a.btn-copy').on('click', function (e) {
        var copy_ele = $(this).siblings('span.copy-txt')[0];
        copyToClipboard(e, copy_ele);
    });
    function copyToClipboard(e, copy_ele) {
        var clipboardData = window.clipboardData || e.clipboardData;
        var txt = $(copy_ele).text();
        $('.pop-tip').show();
        if (clipboardData) {
            clipboardData.clearData();
            clipboardData.setData("text/plain", txt);
        } else if (document.execCommand) {
            var range = document.createRange();
            range.selectNode(copy_ele);

            var selection = window.getSelection();
            if (selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
        } else {
            //$('p.tip-txt').text('复制失败');
        }
        setTimeout(function () {
            $('.pop-tip').hide();
        },3000);
    }

    $('input.btn-sub').on('click', function () {
        var $this = $(this);
        var parId = $('input.parId').val();
        var eAddr = $('.e-addr input').val();
        var onEn = $(this).val() != "提交";
        var pageLang = $(this).val();
        if (!eAddr) {
            $('.pop-tip').show();
            $('p.tip-txt').text(onEn ? 'Please enter your ETH wallet address':'请输入你的ETH钱包地址');
            return false;
        } else if (eAddr.substr(0, 2) != "0x") {
            $('.pop-tip').show();
            $('p.tip-txt').text(onEn ? 'Please enter the correct address' : '请输入正确的地址');
            return false;
        }
        
        $(this).prop('disabled','true');
        $.ajax({
            url: '../Telegram/Index',
            type: 'post',
            data: { parentId: parId, ethAddress: eAddr },
            success: function (data) {
                $('.pop-tip').show();
                if (data.success == false) {
                    //$('.pop-tip p').html(onEn ?"<strong>The address has been registered</strong>":"<strong>该地址已注册</strong>将为您查询该地址相关信息");
                } else {
                    //$('.pop-tip p').text(onEn ?"Success":"注册成功");
                }
                setTimeout(function () {
                    if (pageLang == "제출") {
                        location.href = "../Telegram/DetailKP?code=" + data.VerificationCode;
                        return false;
                    }
                    if (onEn) {
                        location.href = "../Telegram/DetailEn?code=" + data.VerificationCode;
                    } else {
                        location.href = "../Telegram/Detail?code=" + data.VerificationCode;
                    }
                },4000);
            },
            error: function () {
                console.log('失败');
                $('.pop-tip').show().find('p').text("failed!");
                setTimeout(function () {
                    $('.pop-tip').hide();
                }, 2000);
                $this.removeProp('disabled');
            }
        });
        return false;
    });
    $('.modal').on('click', function () {
        $(this).hide();
    })
});