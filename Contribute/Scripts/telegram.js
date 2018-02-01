$(function () {
    $('a.btn-copy').on('click', function (e) {
        var copy_ele = $(this).siblings('span')[0];
        copyToClipboard(e, 'Hello, world!', copy_ele);
    });
    function copyToClipboard(e, txt, copy_ele) {
        var clipboardData = window.clipboardData || e.clipboardData;
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
            //$('p.tip-txt').text('复制失败，请手动');
        }
        setTimeout(function () {
            $('.pop-tip').hide();
        },3000);
    }

    $('input.btn-sub').on('click', function () {
        var parId = $('input.parId').val();
        var eAddr = $('.e-addr input').val();
        var onEn = $(this).val() == "Submit";
        if (!eAddr) {
            if (!onEn) {
                alert('请输入你的ETH钱包地址');
            } else {
                alert('Please enter your ETH wallet address');
            }
            return false;
        } else if (eAddr.substr(0,2) != "0x"){
            alert('请输入正确的地址');
            return false;
        }
        
        $(this).prop('disabled');
        $.ajax({
            url: '../Telegram/Index',
            type: 'post',
            data: { parentId: parId, ethAddress: eAddr },
            success: function (data) {
                console.log('成功');
                $('.pop-tip').show();
                if (data.success == false) {
                } else {
                    $('.pop-tip p').text("注册成功");
                }
                setTimeout(function () {
                    if (onEn) {
                        location.href = "../Telegram/DetailEn?code=" + data.VerificationCode;
                    } else {
                        location.href = "../Telegram/Detail?code=" + data.VerificationCode;
                    }
                },4000);
            },
            error: function () {
                console.log('失败');
                $('.pop-tip').show().find('p').text("注册失败，请重试");
                setTimeout(function () {
                    $('.pop-tip').hide();
                },2000);
            }
        });
        //return false;
    });
    $('.modal').on('click', function () {
        $(this).hide();
    })
});