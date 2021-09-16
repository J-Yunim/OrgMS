import React from 'react';
import { formatMessage } from 'umi/locale';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import router from 'umi/router';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';
import Authorized from '@/utils/Authorized';

const { Header } = Layout;

const HeaderDom = () => {

    const [state, setstate] = useState({visible: true})
    
    const getDerivedStateFromProps = (props, state) => {
        if (!props.autoHideHeader && !state.visible) {
          return {
            visible: true,
          };
        }
        return null;
      }

    useEffect(() => {
        document.addEventListener('scroll', this.handScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', this.handScroll);
        }
    }, [])
    
    const getHeadWidth = () => {
        const { isMobile, collapsed, setting } = this.props;
        const { fixedHeader, layout } = setting;
        if (isMobile || !fixedHeader || layout === 'topmenu') {
          return '100%';
        }
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    };

    const  handleNoticeClear = type => {
        message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({ id: `component.globalHeader.${type}` })}`);
        const { dispatch } = this.props;
        dispatch({
          type: 'global/clearNotices',
          payload: type,
        });
    };
    
    const  handleMenuClick = ({ key }) => {
        const { dispatch } = this.props;
        if (key === 'userCenter') {
          router.push('/account/center');
          return;
        }
        if (key === 'triggerError') {
          router.push('/exception/trigger');
          return;
        }
        if (key === 'userinfo') {
          router.push('/account/settings/base');
          return;
        }
        if (key === 'logout') {
          dispatch({
            type: 'login/logout',
          });
        }
    };
    
    const  handleNoticeVisibleChange = visible => {
        if (visible) {
          const { dispatch } = this.props;
          dispatch({
            type: 'global/fetchNotices',
          });
        }
    };
    
    const  handScroll = () => {
        const { autoHideHeader } = this.props;
        const { visible } = this.state;
        if (!autoHideHeader) {
          return;
        }
        const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        if (!this.ticking) {
          requestAnimationFrame(() => {
            if (this.oldScrollTop > scrollTop) {
              this.setState({
                visible: true,
              });
              this.scrollTop = scrollTop;
              return;
            }
            if (scrollTop > 300 && visible) {
              this.setState({
                visible: false,
              });
            }
            if (scrollTop < 300 && !visible) {
              this.setState({
                visible: true,
              });
            }
            this.oldScrollTop = scrollTop;
            this.ticking = false;
          });
        }
        this.ticking = false;
    };

    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    
    return (
        visible ? (
            <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
              {isTop && !isMobile ? (
                <TopNavHeader
                  theme={navTheme}
                  mode="horizontal"
                  Authorized={Authorized}
                  onCollapse={handleMenuCollapse}
                  onNoticeClear={this.handleNoticeClear}
                  onMenuClick={this.handleMenuClick}
                  onNoticeVisibleChange={this.handleNoticeVisibleChange}
                  {...this.props}
                />
              ) : (
                <GlobalHeader
                  onCollapse={handleMenuCollapse}
                  onNoticeClear={this.handleNoticeClear}
                  onMenuClick={this.handleMenuClick}
                  onNoticeVisibleChange={this.handleNoticeVisibleChange}
                  {...this.props}
                />
              )}
            </Header>
          ) : null
    )
}

const Header = () =>{
    return (
        <Animate component="" transitionName="fade">
          {HeaderDom}
        </Animate>
      );
}


export default connect(({ user, global, setting, loading }) => ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
    setting,
  }))(HeaderView);
  

