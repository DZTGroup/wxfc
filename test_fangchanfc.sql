-- phpMyAdmin SQL Dump
-- version 3.3.7
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 09 月 21 日 04:31
-- 服务器版本: 5.1.50
-- PHP 版本: 5.2.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `test_fangchan`
--

-- --------------------------------------------------------

--
-- 表的结构 `tb_expert_review`
--

CREATE TABLE IF NOT EXISTS `tb_expert_review` (
  `r_expert_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_expert_photo` varchar(256) NOT NULL,
  `r_expert_name` varchar(64) NOT NULL,
  `r_expert_title` varchar(256) NOT NULL,
  `r_expert_intro` text NOT NULL,
  `r_expert_reviewTitle` varchar(256) NOT NULL,
  `r_expert_reviewDesc` text NOT NULL,
  `r_loupanid` varchar(256) NOT NULL,
  `r_date` varchar(64) NOT NULL,
  PRIMARY KEY (`r_expert_id`)
) ENGINE=MyISAM  DEFAULT  CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `tb_expert_review`
--

INSERT INTO `tb_expert_review` (`r_expert_id`, `r_expert_photo`, `r_expert_name`, `r_expert_title`, `r_expert_intro`, `r_expert_reviewTitle`, `r_expert_reviewDesc`, `r_loupanid`, `r_date`) VALUES
(2, '', '', '', ' 100????', '', '100????', '?????', ''),
(6, 'é›·æ´ª', 'é›·æ´ª', 'é›·æ´ª', ' 100ä¸ªå­—ä»¥å†…', 'é›·æ´ª', '100ä¸ªå­—ä»¥å†…', 'æŽæ—¶çä¹å›­', '1379698458'),
(7, 'é›·æ´ª', 'é›·æ´ªxxxx', 'é›·æ´ª', ' 100ä¸ªå­—ä»¥å†…', '', '100ä¸ªå­—ä»¥å†…', 'æŽæ—¶çä¹å›­', '1379736204');

-- --------------------------------------------------------

--
-- 表的结构 `tb_group_apply`
--

CREATE TABLE IF NOT EXISTS `tb_group_apply` (
  `r_apply_User_Name` varchar(64) NOT NULL DEFAULT '',
  `r_apply_User_phone` varchar(20) NOT NULL DEFAULT '',
  `r_apply_User_Num` int(11) DEFAULT NULL,
  `r_apply_group_id` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`r_apply_User_Name`,`r_apply_User_phone`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tb_group_apply`
--

INSERT INTO `tb_group_apply` (`r_apply_User_Name`, `r_apply_User_phone`, `r_apply_User_Num`, `r_apply_group_id`) VALUES
('liuhgong', '18688945227', 1, '10003.10001'),
('é›·æ´ª', '18688945227', 1, '10003.10001'),
('leonlei', '18876437291', 1, '10003.10001');

-- --------------------------------------------------------

--
-- 表的结构 `tb_group_info`
--

CREATE TABLE IF NOT EXISTS `tb_group_info` (
  `r_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_group_Line` varchar(256) NOT NULL DEFAULT '',
  `r_title_pic` varchar(256) DEFAULT NULL,
  `r_group_title` varchar(256) DEFAULT NULL,
  `r_qishu` varchar(64) DEFAULT NULL,
  `r_loupan` varchar(64) NOT NULL,
  `r_apply_beg_datetime` varchar(64) NOT NULL,
  `r_apply_end_datetime` varchar(64) NOT NULL,
  `r_view_end_datetime` varchar(64) NOT NULL,
  `r_info_1` text NOT NULL,
  `r_info_2` text NOT NULL,
  `r_info_3` text NOT NULL,
  `r_info_4` text NOT NULL,
  `r_apply_datetime` varchar(64) NOT NULL,
  UNIQUE KEY `r_group_id` (`r_group_id`)
) ENGINE=MyISAM   DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `tb_group_info`
--

INSERT INTO `tb_group_info` (`r_group_id`, `r_group_Line`, `r_title_pic`, `r_group_title`, `r_qishu`, `r_loupan`, `r_apply_beg_datetime`, `r_apply_end_datetime`, `r_view_end_datetime`, `r_info_1`, `r_info_2`, `r_info_3`, `r_info_4`, `r_apply_datetime`) VALUES
(13, 'ä¹é¾™å±±', 'undefined', 'ä¹é¾™å±±', '2', 'æŽæ—¶çä¹å›­', '2013-09-09 0:00', '2013-09-09 0:00', '2013-09-09 0:00', 'æŠ¥åäº«æƒŠå–œ\n1ã€å…è´¹å¤§å·´è½¦æŽ¥é€,ä¸­åˆå…è´¹æä¾›åˆé¤(æ°´ï¼Œé¢åŒ…);\n2ã€è´­æˆ¿äº«å—æŠ˜ä¸ŠæŠ˜;\n3ã€å¾®ä¿¡æŠ½å–å¹¸è¿å¤§ç¤¼åŒ…;\n4ã€æµªæ¼«å¤§ç¤¼åŒ…;', 'ä¸Šæµ·èŽ˜åº„åœ°é“ç«™-ä¹é¾™å±±\n9æœˆ14ä¸Šåˆ9ç‚¹é›†åˆï¼Œä¸‹åˆ17ç‚¹è¿”ç¨‹\næŠ¥åæˆªè‡³è‡³9æœˆ13å·ä¸‹åˆ12ç‚¹ï¼Œæˆ‘ä»¬çš„å·¥ä½œäººå‘˜å°†é€šè¿‡çŸ­ä¿¡åŠç”µè¯ä¸Žæ‚¨ç¡®è®¤æŠ¥åä¿¡æ¯', 'å…è´£å£°æ˜Ž\nçœ‹æˆ¿å›¢æ´»åŠ¨æ˜¯å¤§ç”³æˆ¿äº§ç»„ç»‡çš„éžç›ˆåˆ©å…¬ç›Šæ´»åŠ¨ï¼Œå‡¡æŠ¥åå‚åŠ çš„å‡è§†ä¸ºæœ‰å®Œå…¨æ°‘äº‹è¡Œä¸ºèƒ½åŠ›çš„äºº,å¦‚åœ¨æ´»åŠ¨ä¸­å‘ç”Ÿäººèº«æŸå®³ç»“æžœ,å‘èµ·äººåœ¨æ³•å¾‹è§„å®šçš„èŒƒå›´å†…ä¸æ‰¿æ‹…èµ”å¿è´£ä»»ï¼Œç”±å—å®³äººä¾æ®æ³•å¾‹è§„å®šä¾æ³•è§£å†³ï¼ŒåŒæ—¶æ´»åŠ¨ç…§ç‰‡å¯èƒ½ç”¨ä¸Žé¡¹ç›®æŽ¨å¹¿ï¼Œå‡¡æŠ¥åè€…å‡è§†ä¸ºæŽ¥å—æœ¬ç”³æ˜Ž.', '500ä¸ªå­—ä»¥å†…', '2013-09-21 04:15:56');

-- --------------------------------------------------------

--
-- 表的结构 `tb_house_impression`
--

CREATE TABLE IF NOT EXISTS `tb_house_impression` (
  `r_House_impression_ID` int(11) NOT NULL DEFAULT '0',
  `r_House_impression_Desc` varchar(64) NOT NULL DEFAULT '',
  `r_House_impression_Votes` int(11) NOT NULL DEFAULT '0',
  `r_loupan_ID` varchar(64) NOT NULL,
  PRIMARY KEY (`r_loupan_ID`,`r_House_impression_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tb_house_impression`
--

INSERT INTO `tb_house_impression` (`r_House_impression_ID`, `r_House_impression_Desc`, `r_House_impression_Votes`, `r_loupan_ID`) VALUES
(1, 'å°è±¡æ1', 100, 'æŽæ—¶çä¹å›­'),
(2, 'å°è±¡æ2', 100, 'æŽæ—¶çä¹å›­'),
(3, 'å°è±¡æ3', 100, 'æŽæ—¶çä¹å›­'),
(4, 'å°è±¡æ4', 100, 'æŽæ—¶çä¹å›­'),
(5, 'å°è±¡æ5', 100, 'æŽæ—¶çä¹å›­'),
(6, 'å°è±¡æ6', 100, 'æŽæ—¶çä¹å›­'),
(1, '', 0, ''),
(2, '', 0, ''),
(3, '', 0, ''),
(4, '', 0, ''),
(5, '', 0, ''),
(6, '', 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `tb_house_impression_users`
--

CREATE TABLE IF NOT EXISTS `tb_house_impression_users` (
  `r_House_impression_Desc` varchar(64) NOT NULL DEFAULT '',
  `r_House_impression_Votes` int(11) NOT NULL DEFAULT '0',
  `r_UserID` int(11) NOT NULL AUTO_INCREMENT,
  `r_User_Nick` varchar(256) DEFAULT NULL,
  `r_loupan_ID` int(11) NOT NULL,
  PRIMARY KEY (`r_UserID`)
) ENGINE=MyISAM  DEFAULT  CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `tb_house_impression_users`
--

INSERT INTO `tb_house_impression_users` (`r_House_impression_Desc`, `r_House_impression_Votes`, `r_UserID`, `r_User_Nick`, `r_loupan_ID`) VALUES
('è€å­çœ‹å“ˆ', 1, 12, NULL, 0),
('è€å­æ¥äº†', 1, 11, NULL, 2);
